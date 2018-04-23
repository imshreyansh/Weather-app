var set=(id,callback)=>{
    var user={
        id:id,
            name:'shreyansh'
    }
    callback(user);
}
set(31,(userobj)=>{
    console.log(userobj);
});