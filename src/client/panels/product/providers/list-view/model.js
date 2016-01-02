import {Model} from 'backbone';


const filters = [
  'All', 'New', 'Verified', 'Review', 'Active'
].map(function(k){
  return {
    text:  k,
    count: 0,
    key: k.toLowerCase().replace(/\s/g, '_')
  }
});

var ProvidersViewModel = Model.extend({
  defaults: {
    selectedTab: null,
    activeCount: 0,
    verifiedCount: 0,
    newCount: 0,
    reviewCount: 0,
    filters: filters,
  }
});

export default ProvidersViewModel;