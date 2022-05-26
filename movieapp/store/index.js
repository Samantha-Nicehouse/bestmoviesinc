import cookies from "js-cookie"
export const state = () => ({
    isAuth: false
});

export const mutations = {
    set_auth(store, data) {
        store.isAuth = data;
    }
};
export const actions = {

    /**
     * Update configuration list
     * @param {commit} param0
     * @param {String} status data
     */
    async signin({ commit}, data) {
        try {

            const response = await this.$axios({
                method: 'post',
                url: "https://bmiauthorizationapi.azurewebsites.net/api/auth/sign-in",
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify({
                    id: "",
                    email: data.email,
                    password: data.password
                })
            });
            if (response.data && response.status === 200) {
                this.$axios.defaults.headers.common = {
                    Authorization: `Bearer ${response.data.token}`
                };
                cookies.set("x-access-token", response.data.token, { expires: 7 });
                commit("set_auth",true);
            };

        } catch (error) {
            console.error("error", error);
            commit("set_auth",true);
            return false;
        }
    }
};
