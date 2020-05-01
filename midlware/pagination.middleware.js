module.exports = async (model, partItem, page) => {

   // count item in model db
   let itemCount = await model.count()
                          .then(itemCount => itemCount)
                          .catch( err => console.log(err));
    // variable for check max page
    let maxPage = await itemCount/partItem;
    // rounding max page
    if (itemCount%partItem != 0){
      maxPage =  ~~(maxPage)  + 1;
        return maxPage;
    }

       const getItem = async (partItem, page, model)=> {

        const offset = page * partItem;

        const result = await model.findAll({
                    limit: partItem,
                    offset,
                    });
        return result;

   };

   switch (page, maxPage, model, partItem) {
       case (page != typeof Number):
           return JSON.stringify( {message:'Страница должна быть равна числу!' });
           break;
       case (page === 0):
           return JSON.stringify( {message:'Страница не может быть равна нулю' });
           break;
       case (page > maxPage):
           return JSON.stringify({message:'Недопустимое количество страниц.' });
           break;
       default:
          return JSON.stringify( {rows:  await getItem(partItem, page, model), maxpage: maxPage, itemOnPage: partItem});

   }


};

