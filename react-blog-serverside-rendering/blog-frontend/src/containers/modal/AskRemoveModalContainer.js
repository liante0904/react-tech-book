import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import AskRemoveModal from 'components/modal/AskRemoveModal'

class AskRemoveModalContainer extends Component {
    handleCancel = () => {
        const { BaseActions } = this.props;
        BaseActions.hideModal('remove');
    }

    handleConfirm = async () => {
        const { BaseActions, PostActions, history, match } = this.props;
        const { id } = match.params;
        try {
            // 포스트 삭제 후, 모달 닫고 웹 사이트로 이동
            await PostActions.removePost(id);
            baseActions.hideModal('remove');
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { visible } = this.props;
        const { handleCancel, handleConfirm } = this;

        return (
            <AskRemoveModal visible={visible} onCancel={handleCancel}
            onConfirm={handleConfirm}/>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.getIn(['modal', 'remove'])
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        PostActions: bindActionCreators(baseActions, dispatch)
    })
)(AskRemoveModalContainer);