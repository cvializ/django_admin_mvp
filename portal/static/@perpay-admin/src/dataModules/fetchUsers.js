import {
    fetchCardActivation,
    fetchCardActivationSuccess,
    fetchCardActivationError,
    fetchCardActivationReset,
} from '/@perpay-admin/actions/ui/cardActivation';
import { fetchCardActivation as fetchCardActivationEpic } from '/@perpay-admin/fintech/epics/ui/cardActivation';
import { createDataModule } from './utils/createDataModule';

const FetchCardActivationDataModule = createDataModule({
    dataRequest: fetchCardActivation,
    dataSuccess: fetchCardActivationSuccess,
    dataError: fetchCardActivationError,
    dataReset: fetchCardActivationReset,
    epic: fetchCardActivationEpic,
});

const getRoot = (state) => state.dataModules.fetchCardActivation;
const initialValue = {};

export const fetchCardActivationDataModule = FetchCardActivationDataModule({
    getRoot,
    initialValue,
});
