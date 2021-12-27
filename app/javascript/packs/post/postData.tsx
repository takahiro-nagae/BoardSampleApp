/****************************************
 * 投稿の定義クラス
 ****************************************/
export class PostData {
  // ポストID
  post_id: number;
  // カテゴリID
  category_id: string;
  // 非表示フラグ
  hide_flag: string;
  // ipアドレス
  ip: string;
  // 名前
  name: string;
  // メール
  mail: string;
  // 件名
  subject: string;
  // 本文
  text: string;
  // 投稿日時
  post_date: Date;
  // クライアントIPアドレス
  clientIp: string;
  // 投稿更新
  updatePosts;
  // ログイン状態
  loggedInStatus: boolean;
}