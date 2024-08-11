import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
type TBreadCrumb = {
	name: string;
	linkable: boolean;
}[];
type SliceState = {
	breadCrumb: TBreadCrumb;
};

const initialState: SliceState = {
	breadCrumb: [],
};

const breadCrumbSlice = createSlice({
	name: 'breadCrumb',
	initialState,
	reducers: {
		setBreadCrumb(state, action: PayloadAction<TBreadCrumb>) {
			state.breadCrumb = action.payload;
		},
		resetState() {
			return initialState;
		},
	},
});

export const { setBreadCrumb, resetState } = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;
