import { Component } from '/@perpay-admin/src/components/Component';
import { fetchUsersDataModule } from '/@perpay-admin/src/dataModules/fetchUsers';
import { fetchUsers, fetchUsersError, fetchUsersReset, fetchUsersSuccess } from '/@perpay-admin/src/actions/dataModules/fetchUsers';
import { connectDataModule } from '/@perpay-admin/src/lib/connectDataModule';

const mapDataModuleStateToProps = (state) => ({
    data: fetchUsersDataModule.getData(state).text,
    errors: fetchUsersDataModule.getErrors(state),
    loading: fetchUsersDataModule.getIsLoading(state),
});

const mapDataModuleDispatchToProps = (dispatch) => ({
    onClickRequest: () => dispatch(fetchUsers()),
    onClickSuccess: () => dispatch(fetchUsersSuccess({ text: 'bar' })),
    onClickError: () => dispatch(fetchUsersError({ message: ['Sad : (']})),
    onClickReset: () => dispatch(fetchUsersReset()),
});

const ComponentContainer = connectDataModule(
    fetchUsersDataModule,
    mapDataModuleStateToProps,
    mapDataModuleDispatchToProps,
)(Component);

export default ComponentContainer;
