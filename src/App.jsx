import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen'
import ResetPasswordScreen from './Screens/ResetPasswordScreen'
import HomeScreen from './Screens/HomeScreen'
import ProductDetailScreen from './Screens/ProductDetailScreen'
import ProtectedRoute from './Components/ProtectedRoute'
import CreateProductScreen from './Screens/CreateProductScreen'
import ValidateEmailScreen from './Screens/ValidateEmailScreen'

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LoginScreen />} />
			<Route path="/register" element={<RegisterScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path='/forgot-password' element={<ForgotPasswordScreen />}/>
			<Route path='/reset-password/:reset_token' element={<ResetPasswordScreen />}/>
			<Route path='/verify-email/:validation_token' element={<ValidateEmailScreen />}/>
			<Route element={<ProtectedRoute/>}>
				<Route path='/home' element={<HomeScreen />}/>
				<Route path='/admin/createProduct' element={<CreateProductScreen/>}/>
				<Route path='/product/:product_id' element={<ProductDetailScreen />}/>
			</Route>
		</Routes>
	)
}

export default App
