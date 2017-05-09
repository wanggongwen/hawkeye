package cn.dceast.common.utils;

import cn.dceast.common.data.Constants;
import cn.dceast.common.data.ServiceRuntimeException;
import com.google.gson.Gson;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;


/**
 * Http请求辅助类
 * 本工具类只适合非文件类型的一般请求
 * @author zhang
 *
 */
@SuppressWarnings("deprecation")
public class HttpClientUtil {

	private static Logger logger = Logger.getLogger(HttpClientUtil.class);
	
    private static PoolingHttpClientConnectionManager connMgr;
    private static RequestConfig requestConfig;
    private static final int MAX_TIMEOUT = 120000;
    private static CloseableHttpClient httpClient = null;
    public static final String DEFAULT_ENCODING="utf-8";
    public static final int DEFAULT_MAX_CONNECTIONS=100;
    public static final String DEFAULT_CONTENT_TYPE="application/json";

    static {
       init();
    }
    
    public static void init(){
    	 connMgr = new PoolingHttpClientConnectionManager();  //设置连接池
         connMgr.setMaxTotal(DEFAULT_MAX_CONNECTIONS);        // 设置连接池大小
         connMgr.setDefaultMaxPerRoute(DEFAULT_MAX_CONNECTIONS);

         RequestConfig.Builder configBuilder = RequestConfig.custom();
         configBuilder.setConnectTimeout(MAX_TIMEOUT);   // 设置连接超时
         configBuilder.setSocketTimeout(MAX_TIMEOUT);    // 设置读取超时
         configBuilder.setConnectionRequestTimeout(MAX_TIMEOUT);  // 设置从连接池获取连接实例的超时
         configBuilder.setStaleConnectionCheckEnabled(true);      // 在提交请求之前 测试连接是否可用
         requestConfig = configBuilder.build();
    }

    /**
     * 生产HttpClient实例
     * 公开，静态的工厂方法，需要使用时才去创建该单体
     * 
     * @return CloseableHttpClient
     */
    public static CloseableHttpClient getHttpClient() {
        if (httpClient == null) {
            httpClient = HttpClients.createDefault();
        }
        return httpClient;
    }

    /**
     * POST请求
     * 1. 接收json参数
     * 2. 可传入header参数
     * @param apiUrl
     * @param jsonStr
     * @return
     */
    public static String doPost(String apiUrl, String jsonStr,Map<String,Object> header,String encoding) {
        String result = "";
        CloseableHttpResponse response = null;
        CloseableHttpClient httpClient = getHttpClient();
        HttpPost httpPost = new HttpPost(apiUrl);
        httpPost.setConfig(requestConfig);
        
        if(encoding==null || "".equals(encoding.trim())){
        	encoding=DEFAULT_ENCODING;
        }
        
        /**
         * 1.设置请求体
         */
        StringEntity reqEntity = new StringEntity(jsonStr,encoding);//解决中文乱码问题
        reqEntity.setContentEncoding(encoding);
        
        if(header.get("content-type")==null || "".equals(header.get("content-type"))){
        	reqEntity.setContentType(DEFAULT_CONTENT_TYPE);
        }
        
        httpPost.setEntity(reqEntity);
        

        /**
         * 2. 设置header参数
         */
        httpPost.setHeader("Accept", DEFAULT_CONTENT_TYPE);
        if(header!=null){
            Iterator<String> iter=header.keySet().iterator();
            while(iter.hasNext()){
                String key=iter.next();
                httpPost.setHeader(key,header.get(key)==null?"":header.get(key).toString());
            }
        }

        try {
            
            response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            
            logger.info(String.format("调用http接口 :%s,返回状态码 :%s", apiUrl,statusCode));
            
            HttpEntity entity = response.getEntity();
            result = EntityUtils.toString(entity, encoding);
        } catch (IOException e) {
            logger.error("调用接口异常: " + e);
            throw new ServiceRuntimeException(Constants.RTN_MESSAGE_ERROR);
        } finally {
            if (response != null) {
                try {
                    EntityUtils.consume(response.getEntity());
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            
            if(httpPost!=null){
            	httpPost.releaseConnection();
            }
        }
        return result;
    }

    /**
     *
     * @param url
     * @param httpConnectionTimeout
     * @param headers
     * @param encoding
     * @return
     */
    public static String doGet(String url, int httpConnectionTimeout, Header[] headers, String encoding) throws  Exception {
        CloseableHttpClient httpClient = HttpClientUtil.getHttpClient();
        HttpGet httpget = null;
        CloseableHttpResponse response = null;
         httpget = new HttpGet(url);
            // 设置请求和传输超时时间
            RequestConfig requestConfig = RequestConfig.custom()
                    .setSocketTimeout(httpConnectionTimeout)
                    .setConnectTimeout(httpConnectionTimeout)
                    .build();

            httpget.setConfig(requestConfig);


            //设置http header信息
            if(headers != null && headers.length != 0){
                httpget.setHeaders(headers);
            }

            response = httpClient.execute(httpget);
            
            if(encoding==null || "".equals(encoding.trim())){
            	encoding=DEFAULT_ENCODING;
            }
            String result = EntityUtils.toString(response.getEntity(), encoding);
            response.close();
            return result;

    }
    /**
     * 调用接口获取所有商户的信息
     * @return
     */
    public static List<Map<String,Object>> getListResultByURLAndKey(String url,String interfaceName,String resultKey) {
        List<Map<String,Object>> resultList = null;
        String result = null;
        try {
            result = HttpClientUtil.doGet(url, 30000, null, null);
            Gson gson = new Gson();
            Map<String,Object> gsonMap =  gson.fromJson(result,Map.class);
            if(null != gsonMap && gsonMap.containsKey("code")) {
                if(Constants.RTN_CODE_SUCCESS.equals((String)gsonMap.get("code"))) {
                    Map<String,Object> resultMap = (Map<String,Object>)gsonMap.get("result");
                    resultList = (List<Map<String, Object>>) resultMap.get(resultKey);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("=========调用远程"+interfaceName+"接口时发生错误===========",e);
        }
        return resultList != null? resultList:new ArrayList<Map<String,Object>>();
    }


}
