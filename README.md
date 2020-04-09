# chact-space DB設計
## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## usersテーブル

|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages



## groups テーブル

|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false, unique: true|

### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :massages



## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user