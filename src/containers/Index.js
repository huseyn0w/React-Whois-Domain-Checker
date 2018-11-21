import React, {Component} from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import Preloader from '../components/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormSection from '../components/Form';
import axios from 'axios';


class Index extends Component{

    state = {
        textField:'',
        selectField:'.com',
        loaderStatus: false,
        checkButtonDisabled:true,
        domainfree:false,
        registeredDate:'',
        expirationDate:'',
        showInfo:false
    };
    
    DomenStatusUpdate = () => {
        this.setState({
            domainfree:true,
            showInfo:true
        })
    }

    DomainDataUpdate = (registerDate, expireDate) => {
        this.setState({
            domainfree: false,
            showInfo: true,
            registeredDate: registerDate,
            expirationDate: expireDate
        })
    }

    loadStatusUpdate = () => {
        this.setState({
            loaderStatus: true
        })
    }

    componentDidMount(){
        this.loadStatusUpdate();
    }

    textFieldHandler = (e) =>{
        var currentText = e.target.value;
        var trimmedString = currentText.replace(/\s/g, "");
        if(e.target.value === ""){
            this.setState({
                textField: trimmedString,
                checkButtonDisabled: true
            })
        }
        else{
            this.setState({
                textField: trimmedString,
                checkButtonDisabled: false
            })
        }
        
    }

    selectFieldHandler = (e) => {
        this.setState({
            selectField: e.target.value
        })
    }

    checkStart = () =>{
        let domainName = this.state.textField;
        let domainZone = this.state.selectField;
        if(domainName !== ""){
            this.setState({
                loaderStatus: false
            });
            var rightContext = this;
            let targetURL = "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_j7mweyIXYnGCJIdPwG9b5amjqByet&domainName=" + domainName + domainZone + "&outputFormat=JSON";
                axios.get(targetURL)
                    .then(function (response) {
                        rightContext.loadStatusUpdate();
                        if(response.data.WhoisRecord.dataError === "MISSING_WHOIS_DATA"){
                            rightContext.DomenStatusUpdate();
                        }
                        else{
                            let registeredDate = response.data.WhoisRecord.createdDate;
                            let expiredDate = response.data.WhoisRecord.createdDate;
                            rightContext.DomainDataUpdate(registeredDate, expiredDate);
                        }

                    })
                    .catch(function (error) {
                        // handle error
                        rightContext.loadStatusUpdate();
                        alert('There is some problem, please try again later');
                    })
        }
        else{
            alert('Please enter domain name!');
        }
        


    }

    render(){
        let info = this.state.showInfo
        ?
            <div className="container">
                 <div className="row">
                    <div className="col-12 text-center">
                        {this.state.domainfree 
                        ?
                            <h2>This domain is Free! You can go and try to buy it!</h2>
                        :
                            <div>
                                <h2>Unfortunately the domain is unavailable!</h2>
                                <p>Registered Date: {this.state.registeredDate}</p>
                                <p>Expiration Date: {this.state.expirationDate}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        :

        null;

        return <div className="PageCover">
            <BackgroundAnimation />
            <Preloader hide={this.state.loaderStatus} />
            <div className="PageContent">
                <Header />
                <FormSection inputChange={this.textFieldHandler} 
                             selectChange={this.selectFieldHandler} 
                             checkStart={this.checkStart} 
                             checkButtonStatus={this.state.checkButtonDisabled}
                />
                {info}
                <Footer />
            </div>
        </div>
    }
}

export default Index;
