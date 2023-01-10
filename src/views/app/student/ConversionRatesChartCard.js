import React from 'react';
import {
  Card,
  CardBody,
} from 'reactstrap';

import { AreaChart } from 'components/charts';

import { conversionChartData } from 'data/charts';

const ConversionRatesChartCard = ({data}) => {
  return (
    <Card className="dashboard-filled-line-chart">
      <CardBody>
        <div className="float-left float-none-xs">
          <div className="d-inline-block">
            <h5 className="d-inline">
              CGPA Chart
            </h5>
            
          </div>
        </div>

        
      </CardBody>

      <div className="chart card-body pt-0">
        <AreaChart shadow data={data} />
      </div>
    </Card>
  );
};

export default ConversionRatesChartCard;
