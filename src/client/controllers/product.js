function ProductController(region, {id, mode, action}){
  require.ensure([], ()=>{
    let baseView = require('../panels/product/index');

    let providersView = require('../panels/product/providers/index');
    let institutionsView = require('../panels/product/institutions/index');
    let servicesView = require('../panels/product/services/index');
    let productsView = require('../panels/product/products/index');
    let contentView = require('../panels/product/content/index');



    let subpanel;
    switch(mode){
      case 'providers':
        subpanel = new providersView({id, action})
        break;
      case 'products':
        subpanel = new productsView({id, action})
        break;
      case 'services':
        subpanel = new servicesView({id, action})
        break;
      case 'institutions':
        subpanel = new institutionsView({id, action})
        break;
      case 'content':
        subpanel = new contentView({id, action})
        break;
      default:
        subpanel = null;
        break;
    }

    region.show( new baseView({subpanel}) );

  })
}

export default ProductController;