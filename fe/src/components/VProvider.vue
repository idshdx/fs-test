<template>
    <div v-if="showProvider">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Provider Name</h4>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <span>Provider Name</span>
                                    <input class="form-control" v-model="provider.name">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn" @click="hideProvider">Cancel</button>
                                <button class="btn" @click="saveProvider()">Save Provider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {PROVIDER_EDIT} from "../store/actions.type";
    export default {
        name: "VDialog",
        props: {
            editedProviderName: "",
            closeProvider: {},
            showProvider: {
                type: Boolean,
                required: true,
            }
        },
        computed: {
            ...mapGetters(["provider"]),
        },
        methods: {
            hideProvider() {
                this.closeProvider(false)
            },
            saveProvider() {
                this.$store.dispatch(PROVIDER_EDIT, this.provider);
                this.hideProvider();
            }
        }
    }
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }
</style>
