import { fetchUsersDataModule } from "/@perpay-admin/src/dataModules/fetchUsers";

const rootReducer = (state = {}, action = {}) => {
    return {
        dataModules: {
            fetchUsers: fetchUsersDataModule.reducer(state?.dataModules?.fetchUsers, action),
        },
    };
};

export default rootReducer;
