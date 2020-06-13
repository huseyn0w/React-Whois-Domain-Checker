import React, { useState, useEffect } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import Preloader from '../components/Preloader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormSection from '../components/Form';
import axios from 'axios';



const Index = (props) => {
    const [state, setState] = useState({
        textField: '',
        selectField: '.com',
        loaderStatus: false,
        checkButtonDisabled: true,
        domainfree: false,
        registeredDate: '',
        expirationDate: '',
        showInfo: false
    });

    useEffect(() => {
        loadStatusUpdate();
    }, []);

    const loadStatusUpdate = () => {
        setState({
            ...state,
            loaderStatus: true
        })
    }

    const DomenStatusUpdate = () => {
        setState({
            ...state,
            domainfree: true,
            showInfo: true
        })
    }

    const DomainDataUpdate = (registerDate, expireDate) => {
        setState({
            ...state,
            domainfree: false,
            showInfo: true,
            registeredDate: registerDate,
            expirationDate: expireDate
        })
    }

    const textFieldHandler = (e) => {
        var currentText = e.target.value;
        var trimmedString = currentText.replace(/\s/g, "");
        if (e.target.value === "") {
            setState({
                ...state,
                textField: trimmedString,
                checkButtonDisabled: true
            })
        } else {
            setState({
                ...state,
                textField: trimmedString,
                checkButtonDisabled: false
            })
        }

    }

    const checkStart = () => {
        let domainName = state.textField;
        let domainZone = state.selectField;
        if (domainName !== "") {
            setState({
                ...state,
                loaderStatus: false
            });
            let targetURL = "https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_j7mweyIXYnGCJIdPwG9b5amjqByet&domainName=" + domainName + domainZone + "&outputFormat=JSON";
            axios.get(targetURL)
                .then(function (response) {
                    console.log(response);
                    loadStatusUpdate();
                    if (!response.data.WhoisRecord.createdDate) {
                        DomenStatusUpdate();
                    } else {
                        let registeredDate = response.data.WhoisRecord.createdDate;
                        if (response.data.WhoisRecord.createdDateNormalized){
                            registeredDate = response.data.WhoisRecord.createdDateNormalized;
                        }
                        let expiredDate = response.data.WhoisRecord.createdDate;
                        if(response.data.WhoisRecord.expiresDateNormalized){
                            expiredDate = response.data.WhoisRecord.expiresDateNormalized;
                        }
                        DomainDataUpdate(registeredDate, expiredDate);
                    }

                })
                .catch(function (error) {
                    // handle error
                    loadStatusUpdate();
                    alert('There is some problem, please try again later');
                })
        } else {
            alert('Please enter domain name!');
        }
    }

    const selectFieldHandler = (e) => {
        setState({
            ...state,
            selectField: e.target.value
        })
    }

    let info = state.showInfo
        ?
            <div className="container">
                 <div className="row">
                    <div className="col-12 text-center">
                        {state.domainfree 
                        ?
                            <h2>This domain is Free! You can go and try to buy it!</h2>
                        :
                            <div>
                                <h2>Unfortunately the domain is unavailable!</h2>
                                <p>Registered Date: {state.registeredDate}</p>
                                <p>Expiration Date: {state.expirationDate}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        :

        null;

    
    return <div className="PageCover">
        <BackgroundAnimation />
            <Preloader hide={state.loaderStatus} />
            <div className="PageContent">
                <Header />
                <FormSection inputChange={textFieldHandler} 
                             selectChange={selectFieldHandler} 
                             checkStart={checkStart} 
                             checkButtonStatus={state.checkButtonDisabled}
                />
                {info}
                <Footer />
            </div>
    </div>;
}

export default Index;
