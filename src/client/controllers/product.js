function ProductController(region, {id, mode, action}){
  require.ensure([], ()=>{
    let baseView = require('../panels/product/index');


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