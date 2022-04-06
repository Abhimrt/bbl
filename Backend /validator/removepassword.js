const removepassword = (json)=>{
    let data = json.toJSON()
    delete data.password
    if(data.timestamp){
        delete data.timestamp
    }
    if(data.__v){
        delete data.__v
    }
    return data
}
module.exports = removepassword