import React, { useContext, useEffect } from 'react';
import { Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { context } from 'App';
import ResultTable from './ResultTable';

const Second3 = ({ match }) => {
  const [data, setDate] = useContext(context)
  const filterSession = (data) => {
    const asArray = Object.entries(data.result)
    const filtered = asArray.filter(([key, value]) => typeof key === "string" && key.includes("/"));
    return filtered;
  }
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.second2" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">

        </Colxx>
      </Row>
      
      {filterSession(data).map(p => (
        <> <h3><b>{p[0]}</b></h3>
        <ResultTable data={p[1]}/>
          </>
      ))}
      <h6><b>CGPA: {data.odata.cgpa}</b></h6>
    </>)
};
export default Second3;
