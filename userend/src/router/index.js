import Index from '../views/Index/'
import SubList from '../views/SubList/'
import Article from '../views/Article/'

const routerMap = [
    {
        name: 'Index',
        path: '/',
        exact: true,
        component: Index
    },
    {
        name: 'SubList',
        path: '/SubList',
        exact: true,
        component: SubList
    },
    {
        name: 'Article',
        path: '/Article',
        exact: true,
        component: Article
    }
]

export default routerMap