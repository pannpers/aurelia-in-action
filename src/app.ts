import { RouterConfiguration, Router } from 'aurelia-router'

export class App {
  router: Router

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router
    // eslint-disable-next-line no-param-reassign
    config.title = 'my-books'
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: './resources/elements/index',
      },
      { route: 'books', name: 'books', moduleId: './resources/elements/books' },
    ])
  }
}
