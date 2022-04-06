import React from 'react'
import { Col, Row } from 'reactstrap'
import { BotonForm, Etiqueta, NumberForm, TextForm } from 'ui/comun/formularios'
import { RangoParametroRequest } from 'core/administracion/domain/entities/request/RangoParametroRequest'
import * as serv from 'core/administracion/application/services/RangoParametroService'

interface Props {
    idParametro: number | undefined,
    idTipoTabla: number,
    idTabla: number
    rangoParametro: RangoParametroRequest
}


export const FormularioTablas: React.FunctionComponent<Props> = ({
    idParametro = 0,
    idTipoTabla = 0,
    idTabla = 0,
    rangoParametro = {
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
    } }) => {

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

    const [state, setState] = React.useState<RangoParametroRequest>(model);

    React.useEffect(() => {
        setState({
            ...state,
            idParamRangosAlgoritmo: rangoParametro.idParamRangosAlgoritmo,
            idParamAlgoritmo: idParametro,
            idTipoTabla: idTipoTabla,
            idTab1: idTabla,
            descripcion: rangoParametro.descripcion,
            valorNumerico1: rangoParametro.valorNumerico1,
            valorNumerico2: rangoParametro.valorNumerico2
        })
    }, [rangoParametro])

    const onChange = async (k: string, v: any) => {
        setState({ ...state, [k]: v })
    }

    const onNuevo = () => {
        setState({
            ...state,
            idParamRangosAlgoritmo: 0,
            idParamAlgoritmo: idParametro,
            idTipoTabla: idTipoTabla,
            idTab1: idTabla,
            descripcion: '',
            valorNumerico1: 0,
            valorNumerico2: 0
        })
    }

    const onGrabar = () => {
        console.log('GRABAR',state);
        if (state.idParamRangosAlgoritmo == 0) {
            serv.Anadir(state)
            .then(response => {
                onNuevo();
            })
            .catch(error => {

            });
        }else{
            serv.Actualizar(state)
            .then(response => {
                onNuevo();
            })
            .catch(error => {

            });
        }
    }

    return (
        <React.Fragment>
            <br />
            <Row>
                <Col lg="12" className="text-right">
                    <BotonForm text='Nuevo' onClick={onNuevo} /> {" "}
                    <BotonForm text='Grabar' className='btnPrimary' onClick={onGrabar} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col lg="2">
                    <Etiqueta etiqueta='Descripción' requerido={true} />
                </Col>
                <Col lg='10'>
                    <TextForm placeholder='Ingrese la descripción'
                        value={state.descripcion}
                        maxLength={100}
                        required={true}
                        onValueChange={onChange}
                        field="descripcion" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col lg="2">
                    <Etiqueta etiqueta='Valor Numérico1' requerido={true} />
                </Col>
                <Col lg='4'>
                    <NumberForm placeholder='Valor 1'
                        value={state.valorNumerico1}
                        min={0}
                        max={100}
                        required={true}
                        onValueChange={onChange}
                        field="valorNumerico1"
                    />
                </Col>
                <Col lg="2">
                    <Etiqueta etiqueta='Valor Numérico2' requerido={true} />
                </Col>
                <Col lg='4'>
                    <NumberForm placeholder='Valor 2'
                        value={state.valorNumerico2}
                        min={0}
                        max={100}
                        required={true}
                        onValueChange={onChange}
                        field="valorNumerico2"
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}