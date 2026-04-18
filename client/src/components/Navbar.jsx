import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {

    const [open, setOpen] = React.useState(false)
    const [showProfileUpload, setShowProfileUpload] = React.useState(false)
    const [showProfileMenu, setShowProfileMenu] = React.useState(false)
    const [imageFile, setImageFile] = React.useState(null)
    const [uploading, setUploading] = React.useState(false)
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios, clearCart } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout')
            if (data.success) {
                toast.success(data.message)
                setUser(null);
                navigate('/');
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleProfileImageUpload = async () => {
        try {
            if (!imageFile) {
                return toast.error("Please select an image")
            }

            setUploading(true)
            const formData = new FormData()
            formData.append('image', imageFile)

            const { data } = await axios.post('/api/user/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (data.success) {
                toast.success(data.message)
                setShowProfileUpload(false)
                setImageFile(null)
                // Refresh user data to get updated profile image
                const { data: userData } = await axios.get('/api/user/is-auth')
                if (userData.success) {
                    setUser(userData.user)
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setUploading(false)
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products');
        }
    }, [searchQuery, navigate]);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/'>
                <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">

                <NavLink to='/seller' className="px-4 py-1 border border-gray-300 rounded-full text-xs hover:bg-primary/10 transition">Seller Dashboard</NavLink>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Products</NavLink>
                <NavLink to='/contact'>Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4' />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {!user ?
                    (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>)
                    : (
                        <div className='relative'>
                            <img 
                                src={user?.profileImage || assets.profile_icon} 
                                className='w-10 rounded-full cursor-pointer' 
                                alt='Profile' 
                                onClick={() => setShowProfileMenu(prev => !prev)}
                                onError={(e) => { e.target.src = assets.profile_icon }}
                            />
                            {showProfileMenu && (
                                <ul className='absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2.5 w-40 rounded-md text-sm z-50'>
                                    <li onClick={() => { navigate("my-orders"); setShowProfileMenu(false); }} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                                    <li onClick={() => { setShowProfileUpload(true); setShowProfileMenu(false); }} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Change Profile Image</li>
                                    <li onClick={() => { clearCart(); setShowProfileMenu(false); }} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Clear Cart</li>
                                    <li onClick={() => { logout(); setShowProfileMenu(false); }} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                                </ul>
                            )}
                        </div>
                    )
                }
            </div>

            <div className='flex items-center gap-4 sm:hidden'>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt='menu' className="cursor-pointer" />
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 flex flex-col gap-4 text-sm z-50 border-t border-gray-200 md:hidden">
                    <NavLink to='/' onClick={() => setOpen(false)} className="hover:text-primary">Home</NavLink>
                    <NavLink to='/products' onClick={() => setOpen(false)} className="hover:text-primary">All Products</NavLink>
                    {user && <NavLink to='/my-orders' onClick={() => setOpen(false)} className="hover:text-primary">My Orders</NavLink>}
                    <NavLink to='/contact' onClick={() => setOpen(false)} className="hover:text-primary">Contact</NavLink>

                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="mt-3 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dull transition cursor-pointer"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="mt-3 px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dull transition cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}

            {/* Profile Image Upload Modal */}
            {showProfileUpload && (
                <div onClick={() => setShowProfileUpload(false)} className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center text-sm text-gray-600 bg-black/50'>
                    <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                        <p className="text-2xl font-medium m-auto">
                            <span className="text-primary">Change</span> Profile Image
                        </p>
                        <div className="w-full">
                            <p>Profile Image</p>
                            <input 
                                onChange={(e) => setImageFile(e.target.files[0])} 
                                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-500" 
                                type="file" 
                                accept="image/*"
                            />
                        </div>
                        <button 
                            onClick={handleProfileImageUpload}
                            disabled={uploading}
                            className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? "Uploading..." : "Upload Image"}
                        </button>
                        <button 
                            onClick={() => setShowProfileUpload(false)}
                            className="bg-gray-200 hover:bg-gray-300 transition-all text-gray-700 w-full py-2 rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

        </nav>
    )
}

export default Navbar
