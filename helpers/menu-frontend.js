
const getMenuFrontEnd = (role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/' },
            { titulo: 'Payrolls', url: 'payrolls' },
          ]
        },
        {
          titulo: 'Config',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Payrolles', url: 'payrolls' },
            { titulo: 'Employees', url: 'employees' },
          ]
        },
      ];

    if ( role === 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ titulo: 'Users', url: 'users' })
    }

    return menu;
}

module.exports = { getMenuFrontEnd };
