// 动态接口
export { getSpreadStyleJson } from '@/axios/urlFromServer';
export { getGeoJson } from '@/axios/urlFromServer';
export { getDatFileStyleJson } from '@/axios/urlFromServer';

export { getCollectionAjax } from '@/axios/project/collection/list'; // 获取当前项目拥有权限的数据集(已勾选的数据集)
export { saveCollectionAjax } from '@/axios/project/collection/save'; // 保存当前项目拥有权限的数据集(已勾选的数据集)
export { roleRoleAuthAjax } from '@/axios/role/roleAuth'; // 查询单个角色权限
export { departmentRoleAuthAjax } from '@/axios/role/dauth'; // 查询部门单个角色权限
export { projectRoleAuthAjax } from '@/axios/role/pauth'; // 查询项目角色权限
export { menuAuth } from '@/axios/auth/mine'; // 查询用户拥有的页面权限
export { authSaveAjax } from '@/axios/auth/save'; // 权限编辑新增
export { getUserListAjax } from '@/axios/user/list'; // 权限设置首页，获取用户列表
export { getUserInfoDetail } from '@/axios/user/userInfo'; // 获取用户详细信息
export { getUserListForSelectAjax } from '@/axios/user/userList'; // 用户列表(下拉框使用)
export { getDepartmentListAjax } from '@/axios/department/list'; // 权限设置首页，获取部门列表
export { getProjectListAjax } from '@/axios/project/list'; // 权限设置首页，获取项目列表
export { getRoleListAjax } from '@/axios/role/list'; // 权限设置首页，获取角色列表
export { getRoleListAllAjax } from '@/axios/role/select/list'; // 权限设置首页，获取角色列表所有
export { stopUserAjax } from '@/axios/user/stop'; // 停用用户
export { startUserAjax } from '@/axios/user/start'; // 停用用户
export { getUserInfoAjax } from '@/axios/user/bmod'; // 单个用户查询信息(编辑用)
export { modifyUserInfoAjax } from '@/axios/user/modifyUserInfo'; // 右上角修改个人信息
export { editUserInfoAjax } from '@/axios/user/mod'; // 更新用户信息
export { addUserInfoAjax } from '@/axios/user/add'; // 新增用户
export { getTagListAjax } from '@/axios/tag/list'; // 标签信息列表
export { addTagAjax } from '@/axios/tag/add'; // 新建标签
export { editTagAjax } from '@/axios/tag/mod'; // 编辑/删除标签
export { editRoleAjax } from '@/axios/role/mod'; // 编辑/删除角色
export { editDepartmentRoleAjax } from '@/axios/role/dleader';
export { editProjectRoleAjax } from '@/axios/role/pleader';
export { addRoleAjax } from '@/axios/role/add'; // 添加角色
export { queryLogAjax } from '@/axios/log/queryLog'; // 查询日志(公用方法)
export { queryProjectTagAjax } from '@/axios/tag/projectTag'; // 获取项目标签信息
export { queryUserTagAjax } from '@/axios/tag/userTag'; // 获取用户标签信息
export { modifyProjectTagAjax } from '@/axios/tag/modifyProjectTag'; // 修改项目标签信息
export { modifyUserTagAjax } from '@/axios/tag/modifyUserTag'; // 修改用户标签信息
export { modifyDepartmentAjax } from '@/axios/department/mod'; // 修改/删除部门信息
export { copyRoleAjax } from '@/axios/role/cpoy'; // 复制角色
export { getAuthTreeAjax } from '@/axios/menu/list'; // 菜单列表（用于生成权限树）
export { addProjectAjax } from '@/axios/project/add'; // 新建项目
export { modifyProjectAjax } from '@/axios/project/mod'; // 修改/删除项目信息
export { addDepartmentAjax } from '@/axios/department/add'; // 修改/删除部门信息
export { menuAuthTreeAjax } from '@/axios/menu/auth/tree'; // 菜单权限树列表
export { getUserGroupListAjax } from '@/axios/usergroup/list'; // 权限设置首页，获取用户组信息列表
export { addUserGroupListAjax } from '@/axios/usergroup/add'; // 权限设置首页，获取用户组列表
export { editUserGroupListAjax } from '@/axios/usergroup/mod'; // 权限设置首页，编辑用户组
export { getUserGroupCollectionAjax } from '@/axios/usergroup/collection/list'; // 权限设置首页，获取当前用户组拥有的数据集
export { saveUserGroupCollectionAjax } from '@/axios/usergroup/collection/save'; // 权限设置首页，保存当前用户组拥有的数据集
export { getProjectMemberListAjax } from '@/axios/project/userList'; // 权限设置首页，获取项目组用户列表
export { getProjectVerifyAjax } from '@/axios/cooperation/space/user/verify'; // 项目是否配置数据集、行级权限
export { getUserGroupVerifyAjax } from '@/axios/usergroup/verify'; // 用户组是否配置数据集、行级权限
export { spaceShowSave } from '@/axios/space/show/save'; // 保存用户设置的展示部门-项目
export { getAuthority } from '@/axios/cooperation/departments'; // 用户权限部门/项目树结构获取
export { getleader } from '@/axios/cooperation/leaders'; // 部门/项目负责人列表获取
export { addfolder } from '@/axios/cooperation/file/add';
export { getfolderTree } from '@/axios/cooperation/folder/tree'; // 部门/项目 文件夹树结构
export { getMemberList } from '@/axios/cooperation/space/users'; // 部门/项目成员列表
export { addMember } from '@/axios/cooperation/space/user/save'; // 部门/项目成员新增
export { moving } from '@/axios/cooperation/moving'; // 单选/多选文件及文件夹移动
export { batchMoving } from '@/axios/cooperation/moving/batch'; // 单选/多选文件及文件夹移动
export { batchCopy } from '@/axios/cooperation/batch/copy'; // 多个文件/文件夹复制
export { batchCopyPre } from '@/axios/cooperation/batch/pre'; // 多个文件/文件夹复制校验
export { cooperationUpdate } from '@/axios/cooperation/update'; // 文件夹/文件编辑
export { cooperationDelete } from '@/axios/cooperation/delete'; // 文件及文件夹删除
export { cooperationTransfer } from '@/axios/cooperation/transfer'; // 文件转让
export { cooperationShareSpaceTree } from '@/axios/cooperation/share/space/tree'; // 分享弹窗部门-项目树结构获取
export { cooperationShareCancel } from '@/axios/cooperation/share/cancel'; // 单选以及多选取消分享
export { cooperationAuthList } from '@/axios/cooperation/auth/list'; // 协作权限列表获取
export { cooperationAuthSave } from '@/axios/cooperation/auth/save'; // 协作权限保存
export { cooperationCopy } from '@/axios/cooperation/copy'; // 单个文件/文件夹复制
export { cooperationExit } from '@/axios/cooperation/exit'; // 退出部门/项目
export { cooperationUncopyList } from '@/axios/cooperation/uncopy/list'; // 获取未拥有复制权限的文件列表
export { getProjectListRecentShare } from '@/axios/cooperation/shareRecentProject'; // 查询用户最近分享的项目列表
export { getProjectList } from '@/axios/department/queryProject'; // 获取分享列表的项目列表
export { getShareRecentDepartment } from '@/axios/cooperation/shareRecentDepartment'; // 查询用户最近分享的部门列表
export { getDepartmentList } from '@/axios/department/queryDepartment'; // 获取分享列表的部门列表
export { shareConfigSave } from '@/axios/board/shareConfig'; // 分享列表保存
export { cooperationShare } from '@/axios/cooperation/share'; // 文件夹/文件多选及单选分享
export { cooperationBatchShare } from '@/axios/cooperation/share/batch'; // 协作空间批量分享
export { preShareCheck } from '@/axios/cooperation/share/pre'; // 分享文件时前置弹窗提示
export { shareDepartAuth } from '@/axios/cooperation/shareDepartAuth'; // 判断内页是否有部门分享权限
export { getCooperationName } from '@/axios/cooperation/name'; // 复制某文件时，文件名框中默认回显的姓名
export { preCancelkCheck } from '@/axios/file/share/cancelCheck'; // 取消分享前置校验弹窗
export { getConstantVar } from '@/axios/dict/value'; // 获取后端配置的一些常量
export { getOssInfo } from '@/axios/system/config_oss'; // 请求 OSS 信息
export { getSpreadLisence } from '@/axios/system/config_spread_js'; // 获取 Spread 证书
export { getMailSuffix } from '@/axios/system/match_mail'; // 获取邮箱后缀
export { getInterfaceInfo } from '@/axios/interface/getInterfaceInfo'; // 获取接口文件过滤器配置信息
export { getInterFaceList } from '@/axios/interface/object/list'; // 接口对象列表查询
export { getInterFaceRunData } from '@/axios/interface/template/query'; // 接口内页运行
export { saveCustomeInterface } from '@/axios/interface/template/save'; // 接口内页保存
export { getCustomeInterface } from '@/axios/interface/template/get'; // 接口内页信息获取
export { getCustomeInterfaceList } from '@/axios/interface/list'; // 接口列表页获取
export { stopCustomeInterface } from '@/axios/interface/off'; // 接口停用
export { startCustomeInterface } from '@/axios/interface/on'; // 接口启用
export { deleteCustomeInterface } from '@/axios/interface/del'; // 接口删除
export { getConfigInfo } from '@/axios/interface/getConfig'; // 获取配置信息
export { setConfigInfo } from '@/axios/interface/configObject'; // 确认配置信息
export { interfaceConfig } from '@/axios/interface/object/edit'; // 接口对象配置
export { addInterfaceConfig } from '@/axios/interface/object/add'; // 添加接口对象
export { getCollectionIds } from '@/axios/interface/object/getCollectionTree'; // 获取对象数据集权限id列表
export { updateCollectionAuth } from '@/axios/interface/object/updateCollectionAuth'; // 接口对象 更新数据集权限
export { getWorkbenchList } from '@/axios/collection/workbenchList'; // 获得数据集列表
export { getColumnAuth } from '@/axios/interface/object/getColumnAuth'; // 获取标签权限
export { updateColumnAuth } from '@/axios/interface/object/updateColumnAuth'; // 获取标签权限
export { getTagAuth } from '@/axios/interface/object/getTagAuth'; // 获取标签权限
export { updateTagAuth } from '@/axios/interface/object/updateTagAuth'; // 接口对象 更新标签权限
export { checkPush } from '@/axios/interface/object/testUrl'; // 校验推送地址
export { getDocument } from '@/axios/interface/getDocumentUrl'; // 获取说明文档下载地址
export { saveCustomeInterfaceName } from '@/axios/interface/template/name/save'; // 自定义接口内页名称保存
export { stopInterfaceObj } from '@/axios/interface/object/off'; // 接口对象停用
export { startInterfaceObj } from '@/axios/interface/object/on'; // 接口对象启用
export { getFieldSource } from '@/axios/column/findCollectionDataSources'; // 查询表各个字段的来源
export { syncDataMapSave } from '@/axios/collection/sql/save'; // 自定义SQL生成数据集
export { getSqlResult } from '@/axios/sql/execute'; // 执行自定义sql语句
export { getSqlLog } from '@/axios/custom/sql/history'; // 获取自定义sql历史记录
export { generateDataSet } from '@/axios/collection/save'; // 自定义SQL生成数据集
export { checkSqlDelete } from '@/axios/sql/pre/sync'; // 检查sql是否有删除字段/表
export { sqlSyncSetting } from '@/axios/sql/sync'; // 同步sql设置
export { commonCollection } from '@/axios/collection/system/common'; // 获取某用户的常用数据集
export { exportAllBoard } from '@/axios/board/export';
export { exportValid } from '@/axios/board/export/valid';
export { getDataList } from '@/axios/collection/listAll';
export { getDashBoardMenuList } from '@/axios/collection/columns';
export { saveBoardName } from '@/axios/board/name/save';
export { getBoardList } from '@/axios/board/list';
export { saveBoard } from '@/axios/board/save'; // 保存大盘
export { exportBoard } from '@/axios/chart/export'; // 导出数据（图）
export { getCollectList } from '@/axios/collection/treeList'; // 获取仪表盘数据集下拉（含层级）
export { getFileLock } from '@/axios/file/lock'; // 文件锁定
export { getFileUnLock } from '@/axios/file/unlock'; // 文件解锁
export { getFileForceUnLock } from '@/axios/file/force/unlock'; // 文件强制解锁
export { getPersonalList } from '@/axios/board/personalList'; // 个人工作台目录
export { getBoardCooperationList } from '@/axios/board/cooperationList'; // 协作空间目录
export { chartCopy } from '@/axios/chart/copy'; // 跨文件复制,
export { vertifyExportBoard } from '@/axios/board/time/verify'; // 导出前校验
export { vertifyExportTable } from '@/axios/board/export/verify'; // 列表导出校验
export { chartTabCopy } from '@/axios/board/tag/copy'; // 标签页跨文件复制,
export { handleImport } from '@/axios/board/handleImport'; // 过滤器筛选上传文件手动导入解析
export { getFieldDetail } from '@/axios/column/findSearchColumn'; // 查询字段详情
export { getFields } from '@/axios/column/findByFolderSearch'; // 根据文件夹和关键词搜索字段
export { getFileFolderList } from '@/axios/collection/treeListFolder'; // 获取数据集文件夹列表,不包括数据集
export { getAnalysis } from '@/axios/sql/analysis'; // SQL分析当前指标
export { getDataBaseList } from '@/axios/db/list'; // 获取数据库列表
export { getTableRelateDataCollection } from '@/axios/table/collections'; // 获取表相关数据集列表
export { getTableFieldInfoList } from '@/axios/table/columns'; // 获取表字段信息列表
export { getFile } from '@/axios/public/floderList'; // 获取文件夹树形结构
export { getDatabaseTreeList } from '@/axios/datasource/list'; // 数据源数据库下拉框树形列表接口
export { getCooperationList } from '@/axios/cooperation/list';
export { portalBatchTransferForm } from '@/axios/portal/batch/transfer'; // 文件所在的空间列表
export { savePortal } from '@/axios/portal/save'; // 保存
export { saveAsPortal } from '@/axios/portal/saveAs'; // 另存为
export { savePortalName } from '@/axios/portal/name/save'; // 保存门户名称
export { getMenuTree } from '@/axios/portal/menu/tree'; // 获取菜单树
export { getMenuAuth } from '@/axios/portal/menu/auth/data'; // 获取菜单权限
export { saveMenuAuth } from '@/axios/portal/menu/auth/save'; // 保存菜单权限
export { getSpaceAuth } from '@/axios/portal/auth'; // 指定空间协作权限获取
export { sharePortal } from '@/axios/portal/share'; // 分享数据门户
export { cancelSharePortal } from '@/axios/portal/share/cancel'; // 取消分享数据门户
export { validateMenuAuth } from '@/axios/portal/menu/auth/validate'; // （校验菜单权限接口），数据门户内页对相应菜单点击删除时，前置校验是否有操作权限；
export { validateMenuOperate } from '@/axios/portal/menu/operate/validate'; // （校验用户是否有所有菜单操作权限），复制及保存时前置校验，返回false时弹窗提示，确定后再进行复制、保存；
export { fileCoopSpaceList } from '@/axios/cooperation/file/spaces'; // 文件所在的空间列表
export { collectionAuthSave } from '@/axios/collection/auth/save'; // 批量数据集权限保存
export { collectionBatchTransferForm } from '@/axios/collection/batch/transfer'; // 批量转让
export { searchFileList } from '@/axios/public/search'; // 搜索文件夹+数据集
export { searchParentFileList } from '@/axios/public/list'; // 查询文件夹下的文件+数据集
export { editDataSets } from '@/axios/collection/edit'; // 编辑数据集
export { folderMove } from '@/axios/public/move'; // 文件(夹)移动
export { fileCopy } from '@/axios/public/paste'; // 文件(夹)复制
export { addFile } from '@/axios/folder/add'; // 新建文件夹
export { editFile } from '@/axios/folder/edit'; // 编辑文件夹
export { deleteFile } from '@/axios/public/del'; // 删除文件夹
export { departmentDepartmentProject } from '@/axios/department/departmentProject'; // 部门项目列表
export { authUseColumns } from '@/axios/collection/auth/use/columns'; // 使用权限字段列表-已经被选中的那些
export { columnDimList } from '@/axios/column/dim/list'; // 获取指定数据集的字段列表
export { columnList } from '@/axios/column/list'; // 获取指定数据集的字段列表
export { authUseBatch } from '@/axios/collection/auth/use/batch'; // 全局添加特殊字段
export { authUseAuthsDetail } from '@/axios/collection/auth/use/auths'; // 使用权限字段详情
export { authUseModify } from '@/axios/auth/use/modify'; // 数据集使用权限保存(已经废弃)
export { userUserList } from '@/axios/user/collectioUserList'; // 用户列表
export { authDataColumns } from '@/axios/collection/auth/data/columns'; // 查询已修改的数据权限字段
export { authDataAuths } from '@/axios/collection/auth/data/auths'; // 查询已修改的标签权限字段详情
export { authDataModify } from '@/axios/auth/data/modify'; // 修改字段数据权限(已经废弃)
export { checkDeleteCollection } from '@/axios/collection/related/files'; // 修改字段数据权限
export { collectionHistoricalVersionList } from '@/axios/collection/version/list'; // 获取数据集内页历史版本列表
export { reSetCollectionHistoricalVersion } from '@/axios/collection/restore'; // 数据集内页历史版本还原备份
export { deleteCollectionHistoricalVersion } from '@/axios/collection/version/del'; // 数据集内页历史版本删除备份
export { getSpaceRuleAjax } from '@/axios/collection/spaceRule'; // 当前空间规则类型
export { getUsergroupGroupListAjax } from '@/axios/usergroup/groupList'; // 用户组状态列表
export { judgeColumncopy } from '@/axios/collection/copy/judge'; // 复制数据集判断是否有无权限的衍生字段
export { getRdsList } from '@/axios/datasource/rds'; // 获取当前数据源列表
export { getRdsInfo } from '@/axios/datasource/rds/get'; // 数据源具体信息查询
export { getDbInfo } from '@/axios/datasource/db/get'; // 数据库具体信息查询
export { testDbLink } from '@/axios/datasource/db/test'; // 数据库连接测试
export { testRdsLink } from '@/axios/datasource/rds/test'; // 数据源连接测试
export { addDbOrRds } from '@/axios/datasource/add'; // 数据源新建，数据库新建、更新
export { editRdsAjax } from '@/axios/datasource/edit'; // 数据源编辑
export { delDbAjax } from '@/axios/datasource/db/del'; //  数据库删除
export { delRdsAjax } from '@/axios/datasource/rds/del'; //  数据源删除
export { getUserIp } from '@/axios/ip'; // 数据源连接测试
export { getCollectionsList } from '@/axios/datasource/db/collections'; // 获取删除数据库影响的数据集名称
export { judgeDbLocal } from '@/axios/datasource/db/judge'; // 判断是否有本地表
export { getColumnsDataSource } from '@/axios/column/findColumnsDataSource'; // 获取计算字段的数据来源
export { getItemFormat } from '@/axios/column/pattern'; // 获取数据集编辑内页的新增计算的数据格式
export { previewTable } from '@/axios/collection/query'; // 预览刷新
export { saveCollection } from '@/axios/collection/edit/save'; // 保存-另存为
export { syncTableStructure } from '@/axios/collection/syncTable'; // 同步表结构
export { getCollectionFilterCondition } from '@/axios/column/collection/distinct'; // 获取过滤条件字段
export { checkderivate } from '@/axios/collection/derived/validate'; // 校验衍生字段的合法性
export { getColumnDistinct } from '@/axios/column/distinct'; // 仪表板过滤条件可枚举条件
export { queryTableJoinInfo } from '@/axios/join/queryJoinInfo';
export { queryAsyncColumn } from '@/axios/table/trans/columns';
export { getCollectionLogList } from '@/axios/collection/log'; // 获取数据集操作日志
export { shareEletronicForm } from '@/axios/spreadsheet/share'; // 电子表格分享
export { spreadsheetBatchTransferForm } from '@/axios/spreadsheet/batch/transfer'; // 电子表格批量转让
export { cancelShareEletronicForm } from '@/axios/spreadsheet/share/cancel'; // 取消电子表格分享
export { eletronicFormAuth } from '@/axios/spreadsheet/auth'; // 电子表格指定空间协作权限获取
export { spreadExcelDropdownList } from '@/axios/spreadsheet/personalList'; // 根目录下电子表格下拉框列表
export { coopSpreadExcelDropdownList } from '@/axios/spreadsheet/cooperationList'; // 协作空间下电子表格下拉框列表
export { getPortalList } from '@/axios/portal/personalList'; // 根目录下数据门户下拉框列表
export { getCoopPortalList } from '@/axios/portal/cooperationList'; // 协作空间下数据门户下拉框列表
export { spreadExcelSheetsDropdownList } from '@/axios/spreadsheet/getSheetList'; // 电子表格sheetList的下拉框列表
export { embedExcelExport } from '@/axios/spreadsheet/board/task'; // 仪表板内嵌电子表格导出
export { embedExcelExportCallback } from '@/axios/spreadsheet/export/callback'; // 电子表格导出文件上传成功回调接口
export { spreadListExportVertify } from '@/axios/spreadsheet/export/verify'; // 电子表格列表页导出校验
export { getHelpDocListAjax } from '@/axios/document/list'; // 文档内页展示所有的帮助文档
export { closeNoticeList } from '@/axios/notice/closeReadNotice'; // 关闭已读通知
export { getNoticeByMode } from '@/axios/notice/list'; // 获取通知列表
export { favoriteFile } from '@/axios/favorite/save'; // 文件添加收藏
export { cancelFavorite } from '@/axios/favorite/cancel'; // 文件取消收藏
export { getFavoriteList } from '@/axios/favorite/list'; // 收藏列表
export { getSpaceUpdate } from '@/axios/favorite/listNew'; // 空间更新列表
export { homeVisited } from '@/axios/homepage/visited'; // 添加访问记录
export { saveUserSpace } from '@/axios/homepage/saveUserSpace'; // 添加所属空间
export { getUserSpace } from '@/axios/homepage/getUserSpace'; // 获取所属空间
export { saveIndexboard } from '@/axios/homepage/saveChart'; // 添加/编辑指标看板
export { getIndexboardList } from '@/axios/homepage/listChart'; // 获取指标看板详情列表
export { deleteIndexboard } from '@/axios/homepage/deleteChart'; // 删除指标看板
export { getLocalList } from '@/axios/local/list'; // 获取本地上传列表页
export { getLocalColumnList } from '@/axios/local/column/list'; // 本地表字段列表
export { getLocalLog } from '@/axios/local/log'; // 查看日志
export { getCollaboratorList } from '@/axios/local/collaborator/list'; // 查询协作者
export { addCollaborator } from '@/axios/local/collaborator/add'; // 添加协作者
export { modCollaborator } from '@/axios/local/collaborator/mod'; // 修改协作者
export { delCollaborator } from '@/axios/local/collaborator/del'; // 删除协作者
export { revoke } from '@/axios/local/revoke'; // 撤销
export { getApprovedList } from '@/axios/local/check/preview'; // 审核预览
export { approvedConfirm } from '@/axios/local/check/confirm'; // 审核通过
export { getTaskInfo } from '@/axios/local/column/edit/list'; // 本地表编辑回显
export { deleteTask } from '@/axios/local/del'; // 删除全表/任务
export { getTaskFiles } from '@/axios/local/file/list'; // 获取任务中的文件列表
export { deleteTaskFiles } from '@/axios/local/file/del'; // 删除部分文件
export { auditFail } from '@/axios/local/check/reject'; // 审核不通过
export { judgeRelatedMail } from '@/axios/mail/file/judge'; // 判断文件涉及的邮件订阅是否包含审核通过的外部邮箱
export { getCollections } from '@/axios/file/collections'; // 返回文件涉及的数据集中用户有权限的数据集
export { getCollectionsAuthorized } from '@/axios/file/authority/collections'; // 返回文件涉及的数据集中用户有权限的数据集
export { getTagsAuthorized } from '@/axios/file/authority/tags'; // 返回文件涉及的行级标签以及当前用户在这些标签下的标签值
export { getMailProcess } from '@/axios/mail/oc/issue'; // 根据邮箱查询oc流程
export { getMailRevokeInfo } from '@/axios/mail/oc/issue/revoke'; // 根据邮箱撤回oc流程
export { revokeMailProcess } from '@/axios/oc/issue/revoke'; // 根据流程id撤回oc流程
export { spreadExcelSheetsList } from '@/axios/spreadsheet/mail/getSheetList'; // 电子表格sheetList的下拉框列表
export { mailBatchTransfer } from '@/axios/subscribe/batch/transfer'; // 批量转让
export { getCopyMailInfo } from '@/axios/mail/copy/get'; // 获取所复制的邮件信息
export { mailExportCallback } from '@/axios/mail/attachment/callback'; // 导出文件回调
export { getTriggerTargets } from '@/axios/mail/recipient/list'; // 获取当前任务的可发送邮件的对象
export { getPersonCheck } from '@/axios/auth/detect'; // 人员检测
export { personCheckBefore } from '@/axios/auth/detect/before'; // 人员检测前置校验
export { cancelTask } from '@/axios/mail/cancel'; // 取消
export { enableTask } from '@/axios/mail/enable'; // 启用
export { disableTask } from '@/axios/mail/disable'; // 停用
export { triggerTask } from '@/axios/mail/trigger'; // 触发
export { revokeTask } from '@/axios/mail/revoke'; // 撤回
export { getMailPushList } from '@/axios/mail/push/list'; // 推送记录
export { getMailtOperateLog } from '@/axios/mail/operate/log'; // 操作日志查询
export { getMailtStatusLog } from '@/axios/mail/status/log'; // 状态日志查询
export { addMail } from '@/axios/mail/add'; // 新增邮件订阅
export { getMailList } from '@/axios/subscribe/list'; // 列表页查询
export { getMailRecipients } from '@/axios/mail/recipients'; //  查询对于文件有预览权限的用户、部门、项目
export { saveMailName } from '@/axios/mail/name/save'; // 邮件订阅保存主题(名称)
export { monitorSelectCollection } from '@/axios/monitor/collection/click'; // 选择数据集时来源记录
export { monitorOperate } from '@/axios/monitor/operate'; // 操作埋点接口
export { monitorOperateBoard } from '@/axios/monitor/board'; // 仪表板操作记录
export { monitorOperateHome } from '@/axios/monitor/home/operate'; // 首页操作记录
export { getOcDepartmentList } from '@/axios/ocautoconfig/ocDepartmentList'; // 获取OC部门列表树形结构（所有的，包括已删除的）
export { getOcDepartmentUsableList } from '@/axios/ocautoconfig/ocDepartmentUsableList'; // 获取OC部门列表树形结构（所有未删除的部门）
export { getOcShopList } from '@/axios/ocautoconfig/ocShopList'; // 获取OC所在店铺列表（所有的，包括已删除的）
export { getOcShopUsableList } from '@/axios/ocautoconfig/ocShopUsableList'; // 获取OC所在店铺列表（所有未删除的）
export { getOcPositionList } from '@/axios/ocautoconfig/ocPositionList'; // 获取OC岗位列表 （所有的，包括已删除的）
export { getOcPositionUsableList } from '@/axios/ocautoconfig/ocPositionUsableList'; // 获取OC岗位列表 （所有未删除的）
export { getEbProjectList } from '@/axios/ocautoconfig/ebProjectList'; // 获取EB项目列表树形结构（所有的，包括已删除的）
export { getEbProjectUsableList } from '@/axios/ocautoconfig/ebProjectUsableList'; // 获取EB项目列表树形结构（所有未删除的）
export { getEbUserGroupList } from '@/axios/ocautoconfig/ebUserGroupList'; // 获取EB用户组列表列表（所有的，包括已删除的）
export { getEbUserGroupUsableList } from '@/axios/ocautoconfig/ebUserGroupUsableList'; // 获取EB用户组列表列表（所有未删除的）
export { getOcConfigValue } from '@/axios/ocautoconfig/getConfigValue'; // 获取OC自动化配置的值
export { setDefaultRole } from '@/axios/role/setDefault'; // 设置某个角色为默认角色--done
export { cancelDefaultRole } from '@/axios/role/cancelDefault'; // 取消默认角色--done
export { saveOcEbProject } from '@/axios/ocautoconfig/saveOcEbProject'; // 新增映射关系（项目）
export { saveOcEbUserGroup } from '@/axios/ocautoconfig/saveOcEbUserGroup'; // 新增映射关系（用户组）
export { getOcEbProjectList } from '@/axios/ocautoconfig/ocEbProjectList'; // 获取oc映射关系列表（项目）--done
export { getOcEbUserGroupList } from '@/axios/ocautoconfig/ocEbUserGroupList'; // 获取oc映射关系列表（用户组）
export { deleteOcEbProject } from '@/axios/ocautoconfig/deleteOcEbProject'; // 根据id删除映射关系（项目）
export { deleteOcEbUserGroup } from '@/axios/ocautoconfig/deleteOcEbUserGroup'; // 根据id删除映射关系（用户组）
export { deactivateOcEbUserGroup } from '@/axios/ocautoconfig/deactivateOcEbUserGroup'; // 根据id停用映射关系（用户组）
export { enableOcEbUserGroup } from '@/axios/ocautoconfig/enableOcEbUserGroup'; // 根据id启用映射关系（用户组）
export { updateOcEbProject } from '@/axios/ocautoconfig/updateOcEbProject'; // 更新映射关系（项目）
export { updateOcEbUserGroup } from '@/axios/ocautoconfig/updateOcEbUserGroup'; // 更新映射关系（用户组）
export { getOcEbUserGroup } from '@/axios/ocautoconfig/getOcEbUserGroup'; // 根据id获取映射关系（用户组）
export { getOcEbProject } from '@/axios/ocautoconfig/getOcEbProject'; // 根据id获取映射关系（项目）
export { getMailPersonCheck } from '@/axios/auth/detect/mail'; // 邮件订阅人员检测
export { getRecycleList } from '@/axios/recycle/list'; // 回收站列表
export { recycleSearch } from '@/axios/recycle/search'; // 搜索
export { recycleRevert } from '@/axios/recycle/revert'; // 恢复
export { recycleDeleted } from '@/axios/recycle/delete'; // 删除
export { recycleClear } from '@/axios/recycle/clear'; // 清空
export { getselfSupportTable } from '@/axios/self/task/list'; // 查询自助取数列表
export { selfSupportBatchTransfer } from '@/axios/self/template/batch/transfer'; // 批量转让
export { cancelAct } from '@/axios/self/task/cancel'; // 取消
export { reActiveTask } from '@/axios/self/task/active'; // 任务激活
export { applyTaskItem } from '@/axios/self/task/apply'; // 任务申请
export { cancelSelfSharePortal } from '@/axios/self/template/share/cancel'; // 取消分享数据门户
export { publicEdit } from '@/axios/public/edit'; // 公用单个文件（夹）名称修改
export { applyTaskItemValid } from '@/axios/self/task/apply/valid'; // 任务申请
export { withdrawalTask } from '@/axios/self/task/withdrawal'; // 任务撤回
export { getTaskCode } from '@/axios/self/task/taskCode'; // 获取任务编码
export { saveTemplete } from '@/axios/self/template/save'; // 保存自助取数模板内页
export { runTemplete } from '@/axios/self/template/query'; // 保存自助取数模板信息
export { createTemplete } from '@/axios/self/template/task'; // 生成取数任务
export { verifytaskColumn } from '@/axios/self/template/task/valid';
export { verifyMainTimeColumn } from '@/axios/self/template/time/verify'; // 生成取数任务前置主时间字段校验
export { getSelfTemlateWorkbenchList } from '@/axios/self/template/list'; // 取数模板接口
export { rePushTask } from '@/axios/self/task/push'; // 任务重新推送
export { reJudgeTask } from '@/axios/self/task/judge'; // 任务重新判定
export { reJudgeTaskValid } from '@/axios/self/task/judge/valid';
export { showLogList } from '@/axios/self/task/log'; // 自助取数任务列表查看日志
export { recordDownload } from '@/axios/monitor/task/download'; // 点击下载任务记录
export { saveTempleteName } from '@/axios/self/template/name/save'; // 自助取数内页名称保存
export { getDepartmentUnset } from '@/axios/tactics/department/unset'; // 获取所有未配置的部门列表
export { getCollectionUnset } from '@/axios/tactics/collection/unset'; // 获取指定集合的未配置数据集列表
export { deleteStrategy } from '@/axios/tactics/delete'; // 审批策略删除
export { strategyStartUse } from '@/axios/tactics/enable'; // 审批策略停用
export { strategyDisable } from '@/axios/tactics/disable'; // 审批策略停用
export { getLog } from '@/axios/tactics/log'; // 审批策略日志查看
export { saveStrategy } from '@/axios/tactics/save'; // 审批策略保存
export { getUsers } from '@/axios/tactics/users'; // eb所有用户列表获取
export { getDepartmentsOc } from '@/axios/tactics/departments'; // 获取OC部门列表
export { getlist } from '@/axios/tactics/list'; // 审批策略列表（含条件筛选）
export { tacticsGet } from '@/axios/tactics/get'; // 审批策略列表（含条件筛选）
export { getRoles } from '@/axios/tactics/roles'; // 获取OC角色列表
export { getTacticsCollections } from '@/axios/tactics/collections'; // 获取系统所有数据集列表
export { getTacticsCollectionsTree } from '@/axios/tactics/collections/tree'; // 获取系统所有数据集列表（树状）
export { getSensitivityFielset } from '@/axios/tactics/sensitivity/columns'; // 获取指定数据集字段列表（含是否设置字段敏感度筛选）
export { getSensitivity } from '@/axios/tactics/sensitivity'; // 字段敏感度下拉框数据获取
export { sensitivitySetSave } from '@/axios/tactics/sensitivity/set'; // 字段敏感度设置保存
export { getCollectionColumns } from '@/axios/tactics/collection/columns'; // 获取所有数据集以及数据集对应的所有日期父字段（包含对应设置的主时间字段信息）
export { saveCollectionMaintime } from '@/axios/tactics/collection/maintime'; // 保存数据集主时间字段设置
export { saveSpreadName } from '@/axios/spreadsheet/name/save'; // 电子表格内页名称保存
export { saveSpread } from '@/axios/spreadsheet/save'; // 电子表格内页信息保存
export { acrossCopySaveSpread } from '@/axios/spreadsheet/copySheet'; // 电子表格内页信息保存
export { spreadJsonUpload } from '@/axios/spreadsheet/json/upload'; // 电子表格json文件上传
export { spreadSaveAs } from '@/axios/spreadsheet/saveAs'; // 电子表格另存为
export { spreadExport } from '@/axios/spreadsheet/task'; // 电子表格内页导出
export { spreadExportValid } from '@/axios/spreadsheet/export/valid';
export { spreadExportVertify } from '@/axios/spreadsheet/time/verify'; // 电子表格导出校验主时间字段
export { getSpreadLog } from '@/axios/spreadsheet/log/list'; // 电子表格操作日志
export { getJoinTablesByDbId } from '@/axios/join/tables'; // 获取数据库所有表
export { getEmutiableFilterCondition } from '@/axios/table/column/distinct'; // 获取过滤条件字段
export { getPreFromJoinTable } from '@/axios/join/query';
export { getCollectionByJoinTable } from '@/axios/collection/join/save';
export { unifyJoinTableSetting } from '@/axios/join/sync'; // 获取数据库列表
export { colorPickerSave } from '@/axios/theme/color/save'; // 颜色选择器设置
export { getAllTheme } from '@/axios/theme/getAll'; // 获取所有主题
export { getDefaultTheme } from '@/axios/theme/getDefaultTheme'; // 获取当前系统默认主题（唯一的）
export { devLogin } from '@/axios/login/dev';
export { vipLoginOut } from '@/axios/login/outer/logout';
export { getFileHasLock } from '@/axios/file/hasLock';
export { getLockFileList } from '@/axios/file/lockFiles';
export { getVipPrivate } from '@/axios/system/deploy/config_private'; // 获取是否私有部署的商户
export { getFileVersion } from '@/axios/file/socket/version';
export { getMsgNoticeList } from '@/axios/msg/notice'; // 获取用户通知类型消息
export { getMsgApproveList } from '@/axios/msg/approve'; // 获取用户审批类型消息
export { doMsgRead } from '@/axios/msg/read'; // 已读指定消息
export { doMsgReadNotice } from '@/axios/msg/read/notice'; // 将通知消息全部标为已读
export { doMsgClear } from '@/axios/msg/clear'; // 清空所有已读通知消息
export { doMsgAudit } from '@/axios/msg/audit'; // 审批类型消息同意接口
export { doMsgReject } from '@/axios/msg/reject'; // 审批类型消息拒绝接口
export { boardBatchTransferForm } from '@/axios/board/batch/transfer'; // 批量转让
export { publicDelValidate } from '@/axios/public/validateShareDel'; // 删除工作台文件时，验证是否包含协作空间文件
export { boardShare } from '@/axios/board/share'; // 仪表板分享
export { boardAuthList } from '@/axios/public/auth/list'; // 仪表板协作权限列表获取
export { boardShareCancel } from '@/axios/board/share/cancel'; // 仪表板文件取消分享
export { saveTableOrder } from '@/axios/list/order/add'; // 保存列表排序
export { judgeContainSpread } from '@/axios/board/contain/spreadsheet'; // 查询仪表板是否包含内嵌电子表格图表
export { publicCopyName } from '@/axios/public/copy/name'; // 文件名复制
export { boardAuthority } from '@/axios/cooperation/auth/get'; // 获取编辑页操作权限
export { getPortalInfo } from '@/axios/portal/get'; // 获取门户信息
export { getFilterCondition } from '@/axios/filter/types';
export { runBoard } from '@/axios/chart/query'; // 运行仪表板
export { getDataBaseTab } from '@/axios/db'; // 获取数据库下所有表
export { getIconOrFontList } from '@/axios/oss/file/list'; // 获取图标列表
export { getEditDataSetsColumn } from '@/axios/collection/edit/columns'; // 获取数据集编辑内页的数据集字段
export { localAdd } from '@/axios/local/add'; // 保存本地上传表(点击‘生成同步任务’)
export { analyzeSingle } from '@/axios/localUpload/import'; // 解析单个文件(首次上传)
export { analyzeMulti } from '@/axios/localUpload/batchImport'; // 解析追加文件
export { getMailInfo } from '@/axios/mail/get'; // 邮件查询信息
export { getTempleteInfo } from '@/axios/self/template/get'; // 保存自助取数模板信息
export { getSpreadOpen } from '@/axios/monitor/file/open'; // 电子表格文件打开时长追踪
export { getSpreadOpenElapsed } from '@/axios/monitor/file/open/elapsed'; // 电子表格监控时长
export { getspreadExcellInfo, getspreadHeartBeat, getspreadExcellInfoLight } from '@/axios/spreadsheet/get'; // 电子表格内页信息过去
export { colorPickerGet } from '@/axios/theme/color/get'; // 颜色选择器保存
export { saveTheme } from '@/axios/theme/add'; // 保存主题
export { updateTheme } from '@/axios/theme/update'; // 更新主题
export { validateDelTheme } from '@/axios/theme/validateDel'; // 删除主题判断-返回引用该主题的文件名字
export { deleteTheme } from '@/axios/theme/delete'; // 删除主题
export { vipLogin } from '@/axios/login/outer'; // vip登录接口
export { pageMonitor } from '@/axios/monitor/page'; // 添加页面监控
export { getMenuList } from '@/axios/user/userPage'; // 获取菜单列表
export { getDashBoardInfo, getDashBoardInfoLight } from '@/axios/board/get'; // 获取仪表板信息
export { joinDerivedValidate } from '@/axios/join/derived/validate'; // 表关联衍生字段合法性校验
export { saveOrCommitContribution } from '@/axios/draft/saveOrCommit'; // 提交文件投稿
export { recommendSave } from '@/axios/draft/recommend/save'; // 推荐时间设置
export { recommendGet } from '@/axios/draft/recommend/get'; // 推荐时间设置
export { recommendCancel } from '@/axios/draft/recommend/cancel'; // 推荐时间
export { homepageViewFirst } from '@/axios/homepage/view/first'; // 获取用户是否首次访问首页
export { homepageViewFinish } from '@/axios/homepage/view/finish'; // 记录用户已经完成首次访问首页
export { getTopHotFiles } from '@/axios/homepage/top10'; // 获取热门文件
export { getRecentActivities } from '@/axios/homepage/recentActivities'; // 获取最近使用文件列表
export { draftLogGet } from '@/axios/draft/log'; // 获取投稿日志
export { draftListGet } from '@/axios/draft/list'; // 获取投稿列表
export { draftGet } from '@/axios/draft/get'; // 获取投稿信息
export { draftDisplayGet } from '@/axios/draft/display'; // 获取优质文件
export { draftCancel } from '@/axios/draft/cancel'; // 撤销投稿
export { delRecentActivities } from '@/axios/homepage/recentActivity/delete'; // 删除最近使用文件
export { getLatest } from '@/axios/document/latest'; // 获取右下角链接
export { getWorkBoardList } from '@/axios/board/workbenchList'; // 获取工作台仪表板列表
export { getWorkPortalList } from '@/axios/portal/workbenchList'; // 获取工作台数据门户列表
export { getWorkSpreadSheetList } from '@/axios/spreadsheet/workbenchList'; // 获取工作台电子表格列表
export { batchAddUserAjax } from '@/axios/user/batchAdd'; // 批量添加用户
export { getCanCreateUserNumAjax } from '@/axios/user/canCreateUserNum'; // 获取剩余可激活用户
export { saveDingPush } from '@/axios/subscribe/dingtalk/save'; // 保存钉钉推送
export { saveDingPushName } from '@/axios/subscribe/dingtalk/name/save'; // 保存钉钉推送名称
export { getDingPushInfos } from '@/axios/subscribe/dingtalk/get'; // 获取任务内页相关信息
export { dingEmptyCheck } from '@/axios/check/null/query'; // 钉钉推送空值校验
export { getCopyDingPushInfo } from '@/axios/subscribe/dingtalk/copy/get'; // 获取钉钉推送复制信息
export { getFileAuthPersons } from '@/axios/subscribe/dingtalk/recipients'; // 查询对于指定文件有预览权限的用户、项目、部门
export { getDingFileCollection } from '@/axios/collection/use/list'; // 获取钉钉推送文件下所涉及的数据集
export { dingManualPush } from '@/axios/subscribe/dingtalk/trigger'; // 钉钉推送手动触发
export { getDingTriggerTargets } from '@/axios/subscribe/dingtalk/user/list'; // 钉钉推送手动触发可推送人员
export { disableDingPush } from '@/axios/subscribe/dingtalk/disable'; // 钉钉推送停用
export { enableDingPush } from '@/axios/subscribe/dingtalk/enable'; // 钉钉推送启用
export { cancelDingPush } from '@/axios/subscribe/dingtalk/cancel'; // 钉钉推送取消
export { getDingPushStatusLogs } from '@/axios/subscribe/dingtalk/status/log'; // 获取钉钉推送任务状态log
export { previewDingPush } from '@/axios/subscribe/dingtalk/preview'; // 预览钉钉推送
export { getExcludeUsers } from '@/axios/subscribe/space/user'; // 获取可排除用户列表
export { importUserFile } from '@/axios/subscribe/dingtalk/user/import'; // 手动上传用户文件
export { draftSceneList } from '@/axios/draft/draft-scene/list'; // 获取模板场景列表
export { draftSceneSave } from '@/axios/draft/draft-scene/save'; // 保存场景
export { draftSceneDelete } from '@/axios/draft/draft-scene/delete'; // 删除场景
export { draftSceneUpdateSort } from '@/axios/draft/draft-scene/updateSort'; // 更新场景排序
export { draftTemplateList } from '@/axios/draft/template/list'; // 获取模板列表
export { draftTemplateUpdate } from '@/axios/draft/template/update'; // 更新模板列表
export { draftApply } from '@/axios/draft/apply'; // 应用模板
export { draftMyDraft } from '@/axios/draft/myDraft'; // 应用模板
export { previewChangeResult } from '@/axios/collection/switch/query'; // 预览数据源切换结果
export { changeDataSource } from '@/axios/collection/switch/execute'; // 切换数据源操作
export { checkChangeSql } from '@/axios/collection/switch/sql/valid'; // 检查数据源切换sql
export { getAllDataTables } from '@/axios/collection/switch/tables'; // 获取数据集下的所有数据表

export { addEmbedPage } from '@/axios/embedPage/save'; // 新增第三方嵌入页面
export { updateEmbedPage } from '@/axios/embedPage/update'; // 更新第三方嵌入页面
export { getEmbedPage } from '@/axios/embedPage/get'; // 获取第三方嵌入页面
export { getEmbedPageList } from '@/axios/embedPage/list'; // 查询第三方嵌入页面
export { unableEmbedPage } from '@/axios/embedPage/unable'; // 停用第三方嵌入页面
export { enableEmbedPage } from '@/axios/embedPage/enable'; // 启用第三方嵌入页面
export { getEmbedPageLog } from '@/axios/embedPage/log'; // 获取第三方嵌入页面日志
export { delEmbedPage } from '@/axios/embedPage/delete'; // 删除第三方嵌入页面
export { getSlicer } from '@/axios/board/slice/get'; // 获取仪表板切片器
export { getSqlPlaceholders } from '@/axios/sql/placeholder';
export { systemStart } from '@/axios/system/start'; // 用于第三方跳转登陆

export { getCanExportFiles } from '@/axios/portal/can/export/files'; // 获取数据门户可导出文件
export { manualTriggerDataExtract } from '@/axios/collection/pump/trigger';
export { draftTemplateView } from '@/axios/draft/templateView'; // 用于记录模板市场访问
export { draftRecommendView } from '@/axios/draft/recommendView'; // 用于首页访问文件

export { getDataDictList } from '@/axios/data/dictionary/workbenchList'; // 获取数据字典列表
export { getDataDictDetails } from '@/axios/data/dictionary/detail'; // 获取数据字典详情
export { addDataDict } from '@/axios/data/dictionary/add'; // 新增数据字典
export { getDataDictTagList } from '@/axios/data/dictionary/tag/list'; // 获取数据字典标签列表
export { checkDataDictNameDuplicate } from '@/axios/data/dictionary/check'; // 检查数据字典名称是否重复
export { updateDataDict } from '@/axios/data/dictionary/update'; // 更新数据字典
export { deleteDataDict } from '@/axios/data/dictionary/delete'; // 删除数据字典
export { checkBeforeStopDataDict } from '@/axios/data/dictionary/stop'; // 检查数据字典是否可停用
export { getDataDictDerivativeFieldList } from '@/axios/data/dictionary/derivation/list'; // 获取数据字典衍生字段列表
export { getDataDictFieldList } from '@/axios/data/dictionary/list'; // 获取数据字典字段列表
export { validateCollectionColumn } from '@/axios/collection/column/validate';
export { checkDataDictUsage } from '@/axios/data/dictionary/validate/use'; // 检查数据字典是否被使用

export { portalExport } from '@/axios/portal/export'; // 获取数据门户可导出文件
export { portalMainTimeVerify } from '@/axios/portal/main/time'; // 获取数据门户主时间字段验证
export { validateExportPortalList } from '@/axios/portal/validate/export/files'; // 验证哪些字段可以导出
export { portalExportApproveValid } from '@/axios/portal/export/approve/valid'; // 数据门户导出验证
export { getDeleteFiles } from '@/axios/portal/files'; // 数据门户导出验证

export { getDerivedCollectionList } from '@/axios/derived/collection/list'; // 衍生数据集列表页查询、搜索
export { renameDerivedCollection } from '@/axios/derived/collection/rename'; // 衍生数据集重命名
export { derivedCollectionBatchTransferForm } from '@/axios/derived/collection/batch/transfer'; // 衍生数据集批量转让
export { authUseAuthsDetailDerived } from '@/axios/derived/collection/auth/use/auths'; // 衍生数据集使用权限字段详情
export { authUseColumnsDerived } from '@/axios/derived/collection/auth/use/columns'; // 获取指定衍生数据集的字段列表
export { derivedCollectionAuthSave } from '@/axios/derived/collection/auth/save'; // 批量衍生数据集权限保存
export { authDataColumnsDerived } from '@/axios/derived/collection/auth/data/columns'; // 查询已修改的数据权限字段
export { authDataAuthsDerived } from '@/axios/derived/collection/auth/data/auths'; // 查询已修改的标签权限字段详情
export { derivedCollectionColumns } from '@/axios/derived/collection/columns'; // 衍生数据集字段信息
export { getDerivedCollection } from '@/axios/derived/collection/get'; // 衍生数据集内页详情
export { queryDerivedCollection } from '@/axios/derived/collection/query'; // 衍生数据集内页查询
export { distinctDerivedCollection } from '@/axios/derived/collection/distinct'; // 衍生数据集内页distinct
export { saveDerivedCollection } from '@/axios/derived/collection/edit/save'; // 衍生数据集内页保存
export { saveAsDerivedCollection } from '@/axios/derived/collection/edit/saveAs'; // 衍生数据集内页另存为
export { authSourceUnion } from '@/axios/derived/collection/auth/source/union'; // 所有输入数据集的交集的权限范围(即最大可设置的权限范围)

export { getDatTaskList } from '@/axios/dat/task/list'; // dat列表页获取
export { datTaskBatchTransferForm } from '@/axios/dat/task/batch/transfer'; // dat批量转让
export { transferDatTask } from '@/axios/dat/task/transfer'; // dat单个转让
export { renameDatTask } from '@/axios/dat/task/rename'; // dat重命名
export { datTaskRunLog } from '@/axios/dat/task/log/run/list'; // dat运行日志
export { datTaskOperateLog } from '@/axios/dat/task/log/operate/list'; // dat操作日志
export { datFolderMove } from '@/axios/dat/task/move'; // dat文件(夹)移动
export { datFileCopy } from '@/axios/dat/task/paste'; // dat文件(夹)复制
export { datDeleteFile } from '@/axios/dat/task/del'; // dat删除文件夹
export { datShareCancel } from '@/axios/dat/task/share/cancel'; // dat取消分享
export { getDatTask } from '@/axios/dat/task/get';
export { runDatTask } from '@/axios/dat/task/start'; // dat运行
export { saveDatTask } from '@/axios/dat/task/save'; // 保存dat任务
export { datTaskSaveAs } from '@/axios/dat/task/saveAs'; // dat任务另存为
export { saveDatTaskName } from '@/axios/dat/task/name/save'; // 保存dat任务名称
export { stopDatTask } from '@/axios/dat/task/stop'; // 停止任务

export { addDataSetIntro } from '@/axios/collect-intro/add'; // 添加数据集介绍
export { getDataSetIntroDetails } from '@/axios/collect-intro/detail'; // 获取数据集介绍详情
export { deleteDataSetIntro } from '@/axios/collect-intro/delete'; // 删除数据集介绍
export { updateDataSetIntro } from '@/axios/collect-intro/update'; // 更新数据集介绍
export { getDataSetIntroList } from '@/axios/collect-intro/page'; // 获取数据集介绍列表
export { checkDataSetIntroModule } from '@/axios/collect-module/check'; // 检查数据集介绍模块
export { getDataSetIntroModules } from '@/axios/collect-module/page'; // 获取数据集介绍模块列表
export { getDataSetIntroMenus } from '@/axios/collect-menu/list'; // 获取数据集介绍菜单列表
export { addDataSetIntroMenu } from '@/axios/collect-menu/add'; // 添加数据集介绍菜单
export { deleteDataSetIntroMenu } from '@/axios/collect-menu/delete'; // 删除数据集介绍菜单
export { updateDataSetIntroMenu } from '@/axios/collect-menu/update'; // 更新数据集介绍菜单
export { saveDataSetIntroModules } from '@/axios/collect-module/add'; // 保存数据集介绍模块
export { getDataSetIntroLogList } from '@/axios/collect-intro-log/list'; // 获取数据集介绍日志列表
export { getDataSetListByMenuId } from '@/axios/collect-intro/collection/list';

export { pushRecordList } from '@/axios/monitor-quota/alert-record-list'; // 监控告警获取推送信息
export { getMonitorInfo } from '@/axios/monitor-quota/get'; // 监控告警获取信息
export { getMonitorAlarmList } from '@/axios/monitor-quota/list'; // 获取监控告警列表
export { quotaDelete } from '@/axios/monitor-quota/quota-delete'; // 删除监控告警
export { quotaStart } from '@/axios/monitor-quota/quota-start'; // 开启监控告警任务
export { getMonitorlRecipients } from '@/axios/monitor-quota/recipients'; // 获得监控告警权限信息
export { getMonitorChartData } from '@/axios/monitor-quota/record-list'; // 监控告警推送记录
export { getMonitorRule } from '@/axios/monitor-quota/rule-get'; // 获取监控告警详细信息
export { setMonitorRule } from '@/axios/monitor-quota/rule-update'; // 修改监控告警详细信息
export { getMonitorRuleName } from '@/axios/board/detect/monitor-alarm'; // 获取监控告警名字列表
export { getAuthDetect } from '@/axios/auth/detect/monitor-alarm'; // 监控告警人员权限

export { oneClickGenerateWorksheet } from '@/axios/report/worksheet/oneClickGenerate'; //一键生成工作表
export { listWorksheet } from '@/axios/report/worksheet/list'; //获取工作表列表
export { deleteWorksheet } from '@/axios/report/worksheet/delete'; //删除工作表
export { oneClickGenerateWorksheet } from '@/axios/report/worksheet/oneClickGenerate'; //一键生成工作表
export { listWorksheet } from '@/axios/report/worksheet/list'; //获取工作表列表
export { deleteWorksheet } from '@/axios/report/worksheet/delete'; //删除工作表
