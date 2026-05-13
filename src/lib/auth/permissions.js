export const ROLES = {
  SUPER_ADMIN: "super_admin",
  PLATFORM_ADMIN: "platform_admin",
  MANAGER: "manager",
  DEVELOPER: "developer",
  SUPPORT: "support",
  TENANT_USER: "tenant_user",
};

export const hasRole = (user, role) => {
  return user?.role === role;
};

export const isAtLeast = (user, role) => {
  const hierarchy = [
    ROLES.TENANT_USER,
    ROLES.SUPPORT,
    ROLES.DEVELOPER,
    ROLES.MANAGER,
    ROLES.PLATFORM_ADMIN,
    ROLES.SUPER_ADMIN,
  ];
  const userIdx = hierarchy.indexOf(user?.role);
  const targetIdx = hierarchy.indexOf(role);
  return userIdx >= targetIdx && targetIdx !== -1;
};

export const canManageTenants = (user) => hasRole(user, ROLES.SUPER_ADMIN);
export const canControlRevenue = (user) => hasRole(user, ROLES.SUPER_ADMIN);
export const canManagePlans = (user) => isAtLeast(user, ROLES.PLATFORM_ADMIN);
export const canModeratePurchases = (user) => isAtLeast(user, ROLES.MANAGER);
export const canEditTemplates = (user) => isAtLeast(user, ROLES.DEVELOPER);
export const canHandleTickets = (user) => isAtLeast(user, ROLES.SUPPORT);
export const canBuildWebsites = (user) => isAtLeast(user, ROLES.TENANT_USER);
