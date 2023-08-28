import Categories from "./Admin/Categories";
import DisplayAllCategories from "./Admin/DisplayAllCategories";
import SubCategories from "./Admin/SubCategories"
import DisplayAllSubCategories from "./Admin/DisplayAllSubCategories";
import Companies from "./Admin/Companies";
import DisplayAllCompanies from "./Admin/DisplayAllCompanies";
import Products from "./Admin/Products";
import DisplayAllProducts from "./Admin/DisplayAllProducts";
import Colors from "./Admin/Colors";
import DisplayAllColors from "./Admin/DisplayAllColors";
import Models from "./Admin/Models";
import DisplayAllModels from "./Admin/DisplayAllModels"
import FinalProducts from "./Admin/FinalProducts";
import DisplayAllFinalProducts from "./Admin/DisplayAllFinalProducts"
import AdminLogin from "./Admin/AdminLogin"
import Banners from "./Admin/Banners"
import DisplayAllBanners from "./Admin/DisplayAllBanners"
import Dashboard from "./Admin/Dashboard"
import Header from "./UserInterface/Header"
import Home from "./UserInterface/Home";
import Footer from "./UserInterface/Footer"
import ProductList from "./UserInterface/ProductList";
import ShoppingCartComponent from "./UserInterface/ShoppingCartComponent";
import SubBanners from "./Admin/SubBanners"
import Testing from "./Admin/Testing"
import DisplayAllSubbanners from "./Admin/DisplayAllSubbanners"
import SignIn from "./UserInterface/SignIn"
import SignUp from "./UserInterface/SignUp"
import ProductPreview from "./UserInterface/ProductPreview";
import OrderSummary from "./UserInterface/OrderSummary"
import PaymentGateway from "./UserInterface/PaymentGateway";
import SubcategoryList from "./UserInterface/SubcategoryList"

import {Route,BrowserRouter as Router} from "react-router-dom"

function App(props) {
  return (
    <div>
      {/* <Categories /> */}
      {/* <DisplayAllCategories /> */}
      <Router>
        <Route strict props={props.history} component={Categories} path="/categories" />
        <Route strict props={props.history} component={DisplayAllCategories} path="/displayallcategories" />
        <Route strict props={props.history} component={SubCategories} path="/subcategories" />
        <Route strict props={props.history} component={DisplayAllSubCategories} path="/displayallsubcategories" />
        <Route strict props={props.history} component={Companies} path="/companies" />
        <Route strict props={props.history} component={DisplayAllCompanies} path="/displayallcompanies" />
        <Route strict props={props.history} component={Products} path="/products" />
        <Route strict props={props.history} component={DisplayAllProducts} path="/displayallproducts" />
        <Route strict props={props.history} component={Colors} path="/colors" />
        <Route strict props={props.history} component={DisplayAllColors} path="/displayallcolors" />
        <Route strict props={props.history} component={Models} path="/models" />
        <Route strict props={props.history} component={DisplayAllModels} path="/displayallmodels" />
        <Route strict props={props.history} component={FinalProducts} path="/finalproducts" />
        <Route strict props={props.history} component={DisplayAllFinalProducts} path="/displayallfinalproducts" />
        <Route strict props={props.history} component={AdminLogin} path="/adminlogin" />
        <Route strict props={props.history} component={Dashboard} path="/dashboard" />
        <Route strict props={props.history} component={Banners} path="/banners" />
        <Route strict props={props.history} component={DisplayAllBanners} path="/displayallbanners" />
        <Route strict history={props.history} component={Header} path="/header" />
        <Route strict history={props.history} component={Home} path="/home" />
        <Route strict history={props.history} component={Footer} path="/footer" />
        <Route strict history={props.history} component={ProductList} path="/ProductList" />
        <Route strict history={props.history} component={ShoppingCartComponent} path="/shoppingcartcomponent" />
        <Route strict history={props.history} component={SubBanners} path="/subbanners" />
        <Route strict history={props.history} component={Testing} path="/testing" />
        <Route strict history={props.history} component={DisplayAllSubbanners} path="/displayallsubbanners" />
        <Route strict history={props.history} component={SignIn} path="/signin" />
        <Route strict history={props.history} component={SignUp} path="/signup" />
        <Route strict history={props.history} component={ProductPreview} path="/productpreview" />
        <Route strict history={props.history} component={OrderSummary} path="/ordersummary" />
        <Route strict history={props.history} component={PaymentGateway} path="/paymentgateway" />
        <Route strict history={props.history} component={SubcategoryList} path="/subcategorylist" />
      </Router>
    </div>
  );
}

export default App;
