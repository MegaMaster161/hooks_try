'use strict';
const Article = require("../models/Article");

module.exports = async (model, partItem, page) => {

     return new Promise((resolve, reject) =>{
            if(page === 0){
               reject( new Error('Страница не может быть равна нулю'));
            } else {
                model.findAndCountAll().then((data) => {

                    let maxPages = ~~(data.count / partItem)
                    let offset = partItem * (page - 1);
                    model.findAll({
                        limit: partItem,
                        offset
                    }).then(items=>{

                        resolve(JSON.stringify({'items': items,
                            'maxItems': data.count,
                            'maxPages': maxPages}))

                    }).catch((error) => {
                        console.log(JSON.stringify('Что то пошло не так в model.findAll'));
                        console.log(error);
                    })
                }).catch((error) => {
                    console.log(JSON.stringify('Что то пошло не так в model.findAndCountAll'));
                    console.log(error);
                });

            }
    });


/*
    const getItem = async ({partItem, page, model}) => {

        const offset = page * partItem;

        console.log('data get item', partItem, offset)

        const result = await model.findAll({
            limit: partItem,
            offset: offset
        });

        return result;

    }
  //  console.log(JSON.stringify( await getItem(2, 2, Article)));



    // count item in model db
    let itemCount = await model.count()
        .then(itemCount => itemCount)
        .catch(err => console.log(err));
    // variable for check max page
    let maxPage = await itemCount / partItem;
    // rounding max page
    if (itemCount % partItem != 0) {
        maxPage = ~~(maxPage) + 1;
        return maxPage;
    }






    return JSON.stringify({rows: getItem(partItem, page, model), maxpage: maxPage, itemOnPage: partItem});
    };






    /*  switch (page, maxPage, model, partItem) {
          case (page != typeof Number):
              return JSON.stringify( {message:'Страница должна быть равна числу!' });
              break;
   //       case (page === 0):
   //           return JSON.stringify( {message:'Страница не может быть равна нулю' });
    //          break;
          case (page > maxPage):
              return JSON.stringify({message:'Недопустимое количество страниц.' });
              break;
          default: */
  //  return JSON.stringify({rows: await getItem(partItem, page, model), maxpage: maxPage, itemOnPage: partItem});

//}


};

