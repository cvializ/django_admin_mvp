
import { html } from '/@perpay-admin/dependencies/htm';
import { useReactRootStoreDispatch } from '/@perpay-admin/src/hooks/useReactRootStoreDispatch';
import { useReactRootStoreSelector } from '/@perpay-admin/src/hooks/useReactRootStoreSelector';

const defaultMergeProps = (moduleProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...moduleProps,
    ...dispatchProps,
});

/**
 * Creates a wrapper around the given component connecting the component with the store.
 * NOTE: The dataModuleDeps reference is not currently used but is planned to be in the future,
 * e.g. for static or runtime safety checks to ensure that data dependency access is consistent.
 */
const withDataModule =
    (
        Component,
        dataModuleDeps,
        mapDataModuleStateToProps = () => ({}),
        mapDataModuleDispatchToProps = () => ({}),
        mergeProps = defaultMergeProps
    ) =>
    (props) => {
        const dispatch = useReactRootStoreDispatch();
        const state = useReactRootStoreSelector((s) => s);

        const mergedProps = mergeProps(
            mapDataModuleStateToProps(state, props),
            mapDataModuleDispatchToProps(dispatch, props),
            props
        );
        return html`<${Component} ...${mergedProps} />`;
    };

export const connectDataModule =
    (
        dataModuleDeps,
        mapDataModuleStateToProps,
        mapDataModuleDispatchToProps,
        mergeProps
    ) =>
    (Component) =>
        withDataModule(
            Component,
            dataModuleDeps,
            mapDataModuleStateToProps,
            mapDataModuleDispatchToProps,
            mergeProps
        );
