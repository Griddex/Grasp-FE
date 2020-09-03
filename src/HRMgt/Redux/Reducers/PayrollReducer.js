import {
  PERSIST_POLICY_REDUX,
  SHOW_IMPORTMODULES,
  HIDE_IMPORTMODULES,
  ADD_POLICYINITIATOR,
  SHOW_RESETPOLICYDIALOG,
  HIDE_RESETPOLICYDIALOG,
  SHOW_SAVEPOLICYDIALOG,
  HIDE_SAVEPOLICYDIALOG,
  SHOW_SENDPOLICYDIALOG,
  HIDE_SENDPOLICYDIALOG,
  RESET_POLICY,
  SAVE_POLICY,
  SEND_POLICY,
  SUCCESS_SENDPOLICY,
  SUCCESS_SAVEPOLICY,
  FAILURE_SENDPOLICY,
  FAILURE_SAVEPOLICY,
} from "../Actions/PayrollActions";

import payrollState from "./../State/PayrollState";

const payrollReducer = (state = payrollState, action) => {
  switch (action.type) {
    case PERSIST_POLICY_REDUX:
      return {
        ...state,
        policy: {
          ...state.policy,
          [action.payload.name]: action.payload.value,
        },
      };

    case SHOW_IMPORTMODULES:
      return { ...state, showImportModulesView: action.payload.open };

    case HIDE_IMPORTMODULES:
      return { ...state, showImportModulesView: action.payload.open };

    case ADD_POLICYINITIATOR:
      return {
        ...state,
        policy: {
          ...state.policy,
          policyInitiator: action.payload.policyInitiator,
        },
      };

    case SHOW_RESETPOLICYDIALOG:
      return {
        ...state,
        policy: {
          ...state.policy,
          resetPolicyDialogShow: action.payload.resetPolicyDialogShow,
        },
      };

    case HIDE_RESETPOLICYDIALOG:
      return {
        ...state,
        policy: {
          ...state.policy,
          resetPolicyDialogShow: action.payload.resetPolicyDialogShow,
        },
      };

    case SHOW_SAVEPOLICYDIALOG:
      return {
        ...state,
        policy: {
          ...state.policy,
          savePolicyDialogShow: action.payload.savePolicyDialogShow,
        },
      };

    case HIDE_SAVEPOLICYDIALOG:
      return {
        ...state,
        policy: {
          ...state.policy,
          savePolicyDialogShow: action.payload.savePolicyDialogShow,
        },
      };

    case SHOW_SENDPOLICYDIALOG:
      return {
        ...state,
        policy: {
          ...state.policy,
          sendPolicyDialogShow: action.payload.sendPolicyDialogShow,
        },
      };

    case HIDE_SENDPOLICYDIALOG:
      return {
        ...state,
        policy: {
          ...state.policy,
          sendPolicyDialogShow: action.payload.sendPolicyDialogShow,
        },
      };

    case RESET_POLICY:
      return {
        ...state,
        policy: {
          ...state.policy,
          ...action.payload.policyData,
        },
      };

    case SAVE_POLICY:
      return {
        ...state,
        saving: action.payload.saving,
      };

    case SUCCESS_SAVEPOLICY:
      return {
        ...state,
        policySaved: action.payload.policySaved,
      };

    case FAILURE_SAVEPOLICY:
      return {
        ...state,
        policySaved: action.payload.policySaved,
      };

    case SEND_POLICY:
      return {
        ...state,
        sending: action.payload.sending,
      };

    case SUCCESS_SENDPOLICY:
      return {
        ...state,
        policySent: action.payload.policySent,
      };

    case FAILURE_SENDPOLICY:
      return {
        ...state,
        policySent: action.payload.policySent,
      };

    default:
      return state;
  }
};
export default payrollReducer;
