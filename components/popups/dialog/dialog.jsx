//** IMPORTS **//

// React
import React from 'react';
import PropTypes from 'prop-types';

// Router
import { withRouter } from 'react-router-dom';

// Components
import PrimaryButton from 'library/buttons/primary';

// Styles
import './dialog.scss';



//** COMPONENT **//

class Dialog extends React.Component {

    static propTypes = {
        acceptId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        rejectId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),

        onClickAccept:  PropTypes.func,
        onClickReject:  PropTypes.func,
        onClickClose:   PropTypes.func,
        
        dialogMessage:  PropTypes.string,
        showCloseButton:PropTypes.bool,
        
        isDialog:       PropTypes.bool,
        isError:        PropTypes.bool,

        history:        PropTypes.object,
    }

    handlerOnClickClose = () => {
        const {history, onClickClose} = this.props;

        onClickClose ? onClickClose() : history.goBack();
    }

    handlerOnClickAccept = (id, event) => {
        const { onClickAccept } = this.props;

        onClickAccept && onClickAccept(id, event);
    }

    handlerOnClickReject = (id, event) => {
        const { onClickReject } = this.props;

        onClickReject ?  onClickReject(id, event) : this.handlerOnClickClose();
    }

    render() {

        const { 
            acceptId,
            rejectId,
            dialogMessage,
            isDialog,
            isError,
            showCloseButton
        } = this.props;

        return (
            <div className="b-dialog">
                <header className="b-dialog__head">
                    {
                        showCloseButton && <span
                                                className="b-dialog__close"
                                                onClick={ this.handlerOnClickClose }
                                            ></span>
                    }
                </header>
                <main className="b-dialog__body">
                    <div className={`b-dialog__message${isError ? "--red" : ""}`}>
                        {dialogMessage}
                    </div>
                    <div className="b-dialog__controls">
                    {
                       isDialog && 
                            <PrimaryButton
                                id={ acceptId }
                                className="b-dialog__button b-dialog__button--accept"
                                primary={true}
                                label="Да"
                                onClick={ this.handlerOnClickAccept }
                            />
                    }
                    {
                        isDialog && 
                            <PrimaryButton
                                id={ rejectId }
                                className="b-dialog__button b-dialog__button--reject"
                                primary={true}
                                label="Нет"
                                onClick={ this.handlerOnClickReject }
                            />
                    }
                    </div>
                </main>
            </div>
        );
    }
}



//** EXPORTS **//
export default withRouter(Dialog);