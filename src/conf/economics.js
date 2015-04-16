/**
 * 中国宏观经济指标
 */
var _ = require('underscore');

var ecnomics_cn = [
	{
		name: 'CPI',
		country: 'cn',
		description: '中国CPI，分全国，城市，和农村。',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=19&r=0.9501735724043101',
		filename:'cpi.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '消费者信心指数',
		country: 'cn',
		description: '中国消费者信心指数，分全国，城市，和农村。',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=19&r=0.758337332168594',
		filename:'xiao_fei_zhe_xin_xin.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '社会消费品零售总额',
		country: 'cn',
		description: '社会消费品零售总额',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=5&r=0.9530770208220929',
		filename:'she_hui_xiao_fei_pin_ling_shou_zong_e.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '货币供给量',
		country: 'cn',
		description: '货币供给量：M2,M1,M0',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=11&r=0.4525883586611599',
		filename:'huo_bi_gong_ji_liang.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '海关进出口增减',
		country: 'cn',
		description: '海关进出口增减，当月进出口，累计进出口',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=1&r=0.6143539345357567',
		filename:'huo_bi_gong_ji_liang.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '全国股票交易统计',
		country: 'cn',
		description: '全国股票交易统计',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=2&r=0.8462758616078645',
		filename:'quang_guo_gu_piao_jiao_yi.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '工业品出厂价格指数PPI',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=22&r=0.6198138503823429',
		filename:'ppi.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '国内生产总值GDP',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=22&r=0.6198138503823429',
		filename:'gdp.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '采购经理人指数PMI',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=21&r=0.5661348395515233',
		filename:'pmi.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '城镇固定资产投资',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=12&r=0.6652732652146369',
		filename:'cheng_zhen_gu_ding_zi_chan_tou_zi.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '新房价格指数',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGFJ&name=%u5317%u4EAC&code=%u4E0A%u6D77&stat=1&mkt=1&r=0.9468838572502136',
		filename:'xin_fang_jia_ge_zhi_shu.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '企业家信心指数',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=8&r=0.1874651680700481',
		filename:'qi_ye_jia_xin_xin_zhi_shu.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '工业增加值增长',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=0&r=0.10661449679173529',
		filename:'gong_ye_zeng_jia_zhi_zeng_zhang.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '企业商品价格指数',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=9&r=0.8884614105336368',
		filename:'qi_ye_shang_pin_jia_ge_zhi_shu.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '外汇和黄金储备',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=16&r=0.05275957123376429',
		filename:'wai_hui_he_huang_jin_chu_bei.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '股票账户统计',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=6&r=0.3909217822365463',
		filename:'gu_piao_zhang_hu_tong_ji.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '外商直接投资数据FDI',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=15&r=0.739548061741516',
		filename:'fdi.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '财政收入',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=14&r=0.6905694727320224',
		filename:'cai_zheng_shou_ru.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '全国税收收入',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=3&r=0.061943449545651674',
		filename:'quan_guo_shui_shou_shou_ru.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '新增信贷数据',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=7&r=0.3107082031201571',
		filename:'xin_zeng_xin_dai_shu_ju.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '银行间拆借利率(1年)',
		country: 'cn',
		description: '',
		url: 'http://data.eastmoney.com/cjsjxml/datas/009096_CNY.xml?r=0.5335287183988839',
		filename:'yin_hang_jian_chai_jie_li_lv.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '本外币存款',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=18&r=0.7597413056064397',
		filename:'ben_wai_bi_cun_kuan.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '外汇贷款数据',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=17&r=0.4051495138555765',
		filename:'wai_hui_dai_kuan_shu_ju.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '存款准备金率',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=23&r=0.17617157334461808',
		filename:'cun_kuan_zhun_bei_jin_lv.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '利率调整',
		country: 'cn',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=ZGZB&mkt=13&r=0.2832193642389029',
		filename:'li_lv_tiao_zheng.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '油价调整（上海）',
		country: 'cn',
		description: '',
		url: 'http://data.eastmoney.com/oilprice/oil_chart.aspx?t=data&city=shanghai&r=0.8902220528107136',
		filename:'you_jia_tiao_zheng.xml',
		lastUpdateTime: 0, 
	},
	// {
	// 	name: '',
	// 	description: '',
	// 	url: '',
	// 	filename:'.xml',
	// 	lastUpdateTime: 0, 
	// },

];

/**
 * 美国宏观经济指标
 */

var ecnomics_us = [
	{
		name: 'ISM制造业指数',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=0',
		filename:'ISM_zhi_zao_ye_zhi_shu.xml',
		lastUpdateTime: 0, 
	},
	{
		name: 'ISM非制造业指数',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=1',
		filename:'ISM_fei_zhi_zao_ye_zhi_shu.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '非农就业人数变化',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=2',
		filename:'fei_nong_jiu_ye_ren_shu_bian_hua.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '贸易帐',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=3',
		filename:'mao_yi_zhang.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '失业率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=4',
		filename:'shi_ye_lv.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '未决房屋销售月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=5',
		filename:'wei_jue_fang_wu_xiao_shou_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '生产者物价指数月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=6',
		filename:'sheng_chan_zhe_wu_jia_zhi_shu_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '核心生产者物价指数月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=7',
		filename:'he_xin_sheng_chan_zhe_wu_jia_zhi_shu_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '核心生产者物价指数年率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=8',
		filename:'he_xin_sheng_chan_zhe_wu_jia_zhi_shu_year.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '核心零售销售月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=9',
		filename:'he_xin_ling_shou_xiao_shou_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '零售销售月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=10',
		filename:'ling_shou_xia_shou_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '消费者物价指数月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=11',
		filename:'xiao_fei_zhe_wu_jia_zhi_shu_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '消费者物价指数年率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=12',
		filename:'xiao_fei_zhe_wu_jia_zhi_shu_year.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '核心消费者物价指数月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=13',
		filename:'he_xin_xiao_fei_zhe_wu_jia_zhi_shu_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '核心消费者物价指数年率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=14',
		filename:'he_xin_xiao_fei_zhe_wu_jia_zhi_shu_year.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '新屋开工',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=15',
		filename:'xin_wu_kai_gong.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '成屋销售',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=17',
		filename:'cheng_wu_xiao_shou.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '耐用品订单月率',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=18',
		filename:'nai_yong_pin_ding_dan_month.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '耐用品订单月率（除运输外）',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=19',
		filename:'nai_yong_pin_ding_dan_bu_han_yun_shu.xml',
		lastUpdateTime: 0, 
	},
	{
		name: 'GDP年率初值',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=21',
		filename:'gdp.xml',
		lastUpdateTime: 0, 
	},
	{
		name: '利率调整',
		country: 'us',
		description: '',
		url: 'http://datainterface.eastmoney.com/EM_DataCenter/XML.aspx?type=GJZB&style=GJZB&mkt=0&stat=22',
		filename:'li_lv.xml',
		lastUpdateTime: 0, 
	},
	// {
	// 	name: '',
	// 	description: '',
	// 	url: '',
	// 	filename:'.xml',
	// 	lastUpdateTime: 0, 
	// },

];


var ecnomics = {
	cn: ecnomics_cn,
	us: ecnomics_us,
	all: ecnomics_cn.concat(ecnomics_us),
}

exports = module.exports = ecnomics;

