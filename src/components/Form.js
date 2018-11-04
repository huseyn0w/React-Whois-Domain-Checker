import React from 'react';
import { Col, Row, Form, FormGroup, Label, Input} from 'reactstrap';
import { Button } from 'reactstrap';



const FormSection = (props) =>{

    const goToCheck = (e) => {
        e.preventDefault();
        props.checkStart();
    }

    const preparing = (text) => {
        props.inputChange(text)
    }
    

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Form className="checkStart" onSubmit={goToCheck}>
                            <Row form>
                                <Col md={9}>
                                    <FormGroup>
                                        <Label for="domainName">Domain Name</Label>
                                        <Input type="text" id="domainName" name="text"  onChange={(text) => preparing(text)} />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label for="domainzone">Domain Zone:</Label>
                                        <Input type="select" name="domainzone" id="domainzone" onChange={props.selectChange}>
                                            <option>.com</option>
                                            <option>.net</option>
                                            <option>.org</option>
                                            <option>.biz</option>
                                            <option>.info</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={1}>
                                    <FormGroup>
                                         <Button color="success" className="checkButton" onClick={goToCheck} disabled={props.checkButtonStatus}>Check</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FormSection;