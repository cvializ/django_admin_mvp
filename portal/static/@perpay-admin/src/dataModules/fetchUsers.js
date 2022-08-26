import {
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersError,
    fetchUsersReset,
} from '/@perpay-admin/src/actions/dataModules/fetchUsers';
import { fetchUsers as fetchUsersEpic } from '/@perpay-admin/src/epics/dataModules/fetchUsers';
import { createDataModule } from '/@perpay-admin/src/lib/createDataModule';

const FetchUsersDataModule = createDataModule({
    dataRequest: fetchUsers,
    dataSuccess: fetchUsersSuccess,
    dataError: fetchUsersError,
    dataReset: fetchUsersReset,
    epic: fetchUsersEpic,
});

const getRoot = (state) => state.dataModules.fetchUsers;
const initialValue = {};

export const fetchUsersDataModule = FetchUsersDataModule({
    getRoot,
    initialValue,
});
