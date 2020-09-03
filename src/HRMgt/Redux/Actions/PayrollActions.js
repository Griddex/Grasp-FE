export const PERSIST_POLICY_REDUX = "PERSIST_POLICY_REDUX";
export const SHOW_IMPORTMODULES = "SHOW_IMPORTMODULES";
export const HIDE_IMPORTMODULES = "HIDE_IMPORTMODULES";
export const ADD_POLICYINITIATOR = "ADD_POLICYINITIATOR";
export const SHOW_RESETPOLICYDIALOG = "SHOW_RESETPOLICYDIALOG";
export const HIDE_RESETPOLICYDIALOG = "HIDE_RESETPOLICYDIALOG";
export const SHOW_SAVEPOLICYDIALOG = "SHOW_SAVEPOLICYDIALOG";
export const HIDE_SAVEPOLICYDIALOG = "HIDE_SAVEPOLICYDIALOG";
export const SHOW_SENDPOLICYDIALOG = "SHOW_SENDPOLICYDIALOG";
export const HIDE_SENDPOLICYDIALOG = "HIDE_SENDPOLICYDIALOG";
export const RESET_POLICY = "RESET_POLICY";
export const SAVE_POLICY = "SAVE_POLICY";
export const SEND_POLICY = "SEND_POLICY";
export const SUCCESS_SENDPOLICY = "SUCCESS_SENDPOLICY";
export const SUCCESS_SAVEPOLICY = "SUCCESS_SAVEPOLICY";
export const FAILURE_SENDPOLICY = "FAILURE_SENDPOLICY";
export const FAILURE_SAVEPOLICY = "FAILURE_SAVEPOLICY";

export const persistPolicyDataToReduxAction = (target) => {
  const { name, value } = target;

  return {
    type: PERSIST_POLICY_REDUX,
    payload: {
      name,
      value,
    },
  };
};

export const importModulesOpenAction = () => ({
  type: SHOW_IMPORTMODULES,
  payload: { open: true },
});

export const importModulesCloseAction = () => ({
  type: HIDE_IMPORTMODULES,
  payload: { open: false },
});

export const addPolicyInitiatorAction = (initiator) => ({
  type: ADD_POLICYINITIATOR,
  payload: {
    policyInitiator: initiator,
  },
});

export const showResetPolicyDialogAction = () => ({
  type: SHOW_RESETPOLICYDIALOG,
  payload: {
    resetPolicyDialogShow: true,
  },
});

export const hideResetPolicyDialogAction = () => ({
  type: HIDE_RESETPOLICYDIALOG,
  payload: {
    resetPolicyDialogShow: false,
  },
});

export const resetPolicyAction = () => ({
  type: RESET_POLICY,
  payload: {
    policyData: {
      policyOwner: "",
      policyOrigin: "",
      policyAudience: "",
      policyName: "",
      policyStatement: "",
      policyInitiator: "",
      policyAssurance: "",
    },
  },
});

export const showSavePolicyDialogAction = () => ({
  type: SHOW_SAVEPOLICYDIALOG,
  payload: {
    savePolicyDialogShow: true,
  },
});

export const hideSavePolicyDialogAction = () => ({
  type: HIDE_SAVEPOLICYDIALOG,
  payload: {
    savePolicyDialogShow: false,
  },
});

export const savePolicyAction = (
  policyOwner,
  policyOrigin,
  policyAudience,
  policyName,
  policyStatement,
  policyInitiator,
  policyAssurance
) => ({
  type: SAVE_POLICY,
  payload: {
    policyData: {
      policyOwner,
      policyOrigin,
      policyAudience,
      policyName,
      policyStatement,
      policyInitiator,
      policyAssurance,
    },
  },
  meta: { addAuth: true },
});

export const showSendPolicyDialogAction = () => ({
  type: SHOW_SENDPOLICYDIALOG,
  payload: {
    sendPolicyDialogShow: true,
  },
});

export const hideSendPolicyDialogAction = () => ({
  type: HIDE_SENDPOLICYDIALOG,
  payload: {
    sendPolicyDialogShow: false,
  },
});

export const sendPolicyAction = (
  policyOwner,
  policyOrigin,
  policyAudience,
  policyName,
  policyStatement,
  policyInitiator,
  policyAssurance
) => ({
  type: SEND_POLICY,
  payload: {
    policyData: {
      policyOwner,
      policyOrigin,
      policyAudience,
      policyName,
      policyStatement,
      policyInitiator,
      policyAssurance,
    },
  },
  meta: { addAuth: true },
});

export const successSavePolicyAction = (result) => ({
  type: SUCCESS_SAVEPOLICY,
  payload: {
    result: result,
  },
});

export const failureSavePolicyAction = (errors) => ({
  type: FAILURE_SAVEPOLICY,
  payload: {
    errors: errors,
  },
});

export const successSendPolicyAction = (result) => ({
  type: SUCCESS_SENDPOLICY,
  payload: {
    result: result,
  },
});

export const failureSendPolicyAction = (errors) => ({
  type: FAILURE_SENDPOLICY,
  payload: {
    errors: errors,
  },
});
