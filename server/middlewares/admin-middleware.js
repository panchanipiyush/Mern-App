const adminMiddleware = async (req,res,next) =>{
 try {

    const adminRole = req.user.isAdmin;

    if(!adminRole){
   //  console.log("not admin");

        return res
        .status(403)
        .json({message:"Access denied. User is not an admin."})
    }
    // res.status(200).json({msg:req.user.isAdmin})
   //  console.log("it is admin");
    next();
 } catch (error) {
    next(error);
 }
}

module.exports = adminMiddleware;