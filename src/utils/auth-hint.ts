const COOKIE_NAME = 'tidytrek_auth_hint';
const MAX_AGE = 24 * 60 * 60 * 180; // 180 days

export const authHint = {
	set() {
		document.cookie = `${COOKIE_NAME}=1; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
	},

	delete() {
		document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	},

	hasAuthHint(): boolean {
		return document.cookie.includes(`${COOKIE_NAME}=1`);
	},

	refresh() {
		if (this.hasAuthHint()) {
			this.set();
		}
	},

	checkAndRefresh() {
		if (this.hasAuthHint()) {
			this.set();
		}
	},
};
