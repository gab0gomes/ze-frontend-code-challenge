import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage
  }
]

export default routes
