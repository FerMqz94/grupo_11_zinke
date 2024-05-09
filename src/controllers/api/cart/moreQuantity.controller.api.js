const { Op, where } = require('sequelize')
const db = require('../../../db/models')
const { getOrder } = require('../../utils')
module.exports = async (req, res) => {
    try {
        const { id } = req.params
        const [orders, isCreate] = await getOrder(req);

        const recond = await db.Orders_Products.findOne({
            where: {
                [Op.and]: [
                    {
                        id_order: orders.id,
                    },
                    {
                        id_product: id
                    }
                ]
            }
        })


        // return res.json(recond)
        recond.quantity++
        await recond.save();

        // orders = await orders.reload({
        //     include: [
        //         {
        //             association: "products",
        //             througth: {
        //                 attrubutes: ["quantity"]
        //             }
        //         }]
        // });
        // const total = getOrder(orders.products);
        // orders.total = total;
        // await orders.save();

        res.status(200).json({
            ok: true,
            msg: "cantidad aumentada como se deberia aumentar"
        })

    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: err.message
        })
    }
}