const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');


const fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;
    const typesValidos = ['payrolls', 'employees', 'users'];
    if (!typesValidos.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'No employee, user or payroll (type)'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no file'
        });
    }
    const file = req.files.imagen;
    const nameSplit = file.name.split('.');
    const fileExtension = nameSplit[nameSplit.length - 1];

    
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'file extension not valid'
        });
    }
    const fileName = `${uuidv4()}.${fileExtension}`;
    const path = `./uploads/${type}/${fileName}`;
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error move imagen'
            });
        }
        updateImage(type, id, fileName);
        res.json({
            ok: true,
            msg: 'file uploaded',
            fileName
        });
    });

}


const returnImage = (req, res = response) => {

    const type = req.params.type;
    const photo = req.params.photo;
    const pathImg = path.join(__dirname, `../uploads/${type}/${photo}`);
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

}


module.exports = {
    fileUpload,
    returnImage
}