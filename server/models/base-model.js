/**
 * @file 数据对象定义基础类
 * @author 小强赵
 */

export default function (schema) {

    schema.pre('save', function (next) {
        const date = new Date().getTime().toString();
        this.createDate = date;
        this.updateDate = date;
        next();
    });

    schema.pre('updateOne', function (next) {
        const date = new Date().getTime().toString();
        this.updateOne({}, {
            $set: {
                updateDate: date
            }
        });
        next();
    });
}
