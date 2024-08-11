// export type TagItem = {
//   code: string;

//   label: {
//     zh_CN: string;
//     en_US: string;
//   };

//   /** tag's route path */
//   // path: string;
//   key: string;

//   /** can be closed ? */
//   closable: boolean;
// };

// export interface TagState {
//   /** tagsView list */
//   tags: TagItem[];

//   /**current tagView id */
//   activeTagId: TagItem["key"];
// }

// export type TagItem = {
//   label: string;
//   key: string;
//   closable: boolean;
// };

// export interface TagState {
//   activeTagId: string;
//   tags: TagItem[];
// }

export interface TagItemType {
  label: string;
  key: string;
  closable?: boolean;
  children?: TagItemType[];
}

export interface TagState {
  activeTagId: string;
  tags: TagItemType[];
}
