import React from 'react'
import { RangoParametroResponse } from 'core/administracion/domain/entities/response/RangoParametroResponse'
import { DataGridForm } from 'ui/comun/formularios/DataGridForm'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { FormularioTablas } from './FormularioTablas';
import { RangoParametroRequest } from 'core/administracion/domain/entities/request/RangoParametroRequest'

interface Props {
  rango: RangoParametroResponse | undefined,
  onRefreshListado? = () =>void
}

const VectorNumerico: React.FunctionComponent<Props> = ({ rango = null,onRefreshListado=null }) => {
  const model: RangoParametroRequest = {
    idParamRangosAlgoritmo: 0,
    idParamAlgoritmo: 0,
    idTipoTabla: 0,
    idTab1: 0,
    idTab2: 0,
    descripcion: '',
    idItem1: 0,
    idItem2: 0,
    idOrden: 0,
    valorNumerico1: 0,
    valorNumerico2: 0,
    valorTexto1: '',
    valorTexto2: '',
    estado: 0
};
  const [activeTab, setActiveTab] = React.useState('1')
  const [rangoParametro,setRangoParametro]= React.useState<RangoParametroRequest>(model)

  const onToggle = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  }

  const onCellClick = (cell: any) =>{
  
    setRangoParametro(cell.data)
  }

  return (
    <React.Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab === '1' ? "active" : ""}
            onClick={() => { onToggle('1'); }}
          >
            Tabla1
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <FormularioTablas            
            idParametro={rango?.idParametro} 
            idTipoTabla={3}
            idTabla={0}
            rangoParametro={rangoParametro}
            onRefreshListado ={onRefreshListado}
            />
          <br />
          <DataGridForm
            dataSource={rango?.tablas}
            keyExpr="idParamRangosAlgoritmo"
            onCellClick={onCellClick}
            exportEnabled={false}
            searchPanel={false}
            columns={[
              { dataField: 'idParamRangosAlgoritmo', caption: 'Id' },
              { dataField: 'descripcion', caption: 'Descripción' },
              { dataField: 'idOrden', caption: 'Orden' },
              { dataField: 'valorNumerico1', caption: 'Valor Numérico' },

              // { caption: 'Rango', width: 70, alignment: 'center', render: 'Rango', cellRender: { Rango } },

            ]}
          />
        </TabPane>
      </TabContent>
    </React.Fragment>
  )
}

export default React.memo(VectorNumerico)