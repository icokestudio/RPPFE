import React from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import ThumbnailLetters from 'components/cards/ThumbnailLetters';

const UserCardExamples = ({data}) => {
  return (
    <Row>
      <Colxx xxs="12">
       
        <Row>
          <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="mb-4">
              <CardBody>
                <div className="text-center">
                  <center>
                  <ThumbnailLetters
                  rounded
                  text={`${data.odata.firstname} ${data.odata.lastname}`}
                  className="img-thumbnail mb-4"
                />
                  </center>
               
                  <NavLink to="#">
                    <CardSubtitle className="mb-1"><b>{data.odata.firstname} {data.odata.othername}{data.odata.lastname} </b></CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-1">
                    {data.odata.matricNumber}
                  </CardText>
                  <CardText className="text-muted text-small mb-4">
                    Student
                  </CardText>
                  
                </div>
              </CardBody>
            </Card>
          </Colxx>

          <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="mb-4">
            
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                    <NavLink to="#">
                      <CardSubtitle className="text-center">
                       <h3><b>Cummulative Grade Point Average (CGPA)</b></h3>
                      </CardSubtitle>
                    </NavLink>
                    <CardText className="text-muted text-small mb-2">
                      <center><h6>{data.odata.cgpa}</h6></center>
                    </CardText>
                    
                  </div>
                </CardBody>
              </div>
            </Card>

            
          </Colxx>
          <Colxx md="6" sm="6" lg="4" xxs="12">
            <Card className="mb-4">
            
            <div className=" d-flex flex-grow-1 min-width-zero">
              <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                <div className="min-width-zero">
                  <NavLink to="#">
                    <CardSubtitle className="text-center">
                     <h3><b>Student Addmission Year/Entry Year</b></h3>
                    </CardSubtitle>
                  </NavLink>
                  <CardText className="text-muted text-small mb-2">
                    {/* {data.cgpa} */}
                    <center><h6>{data.odata.yearOfEntry.session.session}</h6></center>
                  </CardText>
                  
                </div>
              </CardBody>
            </div>
          </Card>
          </Colxx>

          
        </Row>
      </Colxx>
    </Row>
  );
};

export default UserCardExamples;
