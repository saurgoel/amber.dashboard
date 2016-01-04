import {Model, Collection} from 'backbone';

// API Model
var APIModel = Model.extend({
  parse(data){
    return data
  }
});

// API Collection
var APICollection = Collection.extend({


  parse(response){
    let {meta, results} = response.data;
    this.collection.meta = meta;
    return results;
  },

  getMeta(){
    return this.meta
  }

});


export default APICollection;