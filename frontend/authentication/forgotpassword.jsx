export default function ForgotPassword(){
    const [formData,setFormData]=useState({
        email:"",
        password1:"",
        password2:""
    })
    const handleChange=(e)=>{
        const {name,value} =e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
    };
    return<>
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Change Your Password</h2>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" placeholder="Enter your Email Address" value={formData.email} onChange={handleChange}required />
                <label htmlFor="email">Set Up Your New Password</label>
                <input type="password" name="password1" id="password" placeholder="Enter Your New Password" value={formData.email} onChange={handleChange}required />
                <label htmlFor="password2">Confirm Your Password</label>
                <input type="password" name="password2" id="password2" placeholder="Confirm Your New Password" value={formData.password2} onChange={handleChange}required />
                <button type="submit">Confirm</button>
            </form>
        </div>
    </>
}