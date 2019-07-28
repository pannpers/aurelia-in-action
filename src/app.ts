import { RouterConfiguration, Router } from 'aurelia-router'

export class App {
  router: Router

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router
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
