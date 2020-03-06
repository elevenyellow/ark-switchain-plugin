module.exports = {
  register() {
    this.routes = [
      {
        path: "/switchain",
        name: "switchain",
        component: "MainPage"
      },
      {
        path: "/stepper",
        name: "stepper",
        component: "StepperPage"
      }
    ];

    this.menuItems = [
      {
        routeName: "switchain",
        title: "Switchain"
      }
    ];

    console.log(`I'm a plugin`);
  },
  getComponentPaths() {
    return this.routes.reduce((all, route) => {
      return {
        ...all,
        [route.component]: `pages/${route.component}.js`
      };
    }, {});
  },

  getRoutes() {
    return this.routes;
  },

  getMenuItems() {
    return this.menuItems;
  }
};
