package cn.dceast.common.utils;

import java.util.Map;

/**
 * （一句话描述）
 * 作用：
 *
 * @author 王功文
 * @date 2017/2/28 14:51
 * @see
 */
public class StringUtils {
    public StringUtils() {
    }

    public static boolean isBlank(String str) {
        return str == null || "".equals(str.trim());
    }

    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }

    public static boolean isBlank(Map<?, ?> map, Object key) {
        boolean flag = false;
        if(map.containsKey(key)) {
            Object o = map.get(key);
            if(o == null) {
                flag = true;
            } else if(o instanceof String && "".equals(((String)o).trim())) {
                flag = true;
            }
        } else {
            flag = true;
        }

        return flag;
    }

    public static boolean isNotBlank(Map<?, ?> map, Object key) {
        return !isBlank(map, key);
    }

    public static String addLike(Object str) {
        return "%" + (String)str + "%";
    }

    public static String escape(String src) {
        StringBuffer tmp = new StringBuffer();
        tmp.ensureCapacity(src.length() * 6);

        for(int i = 0; i < src.length(); ++i) {
            char j = src.charAt(i);
            if(!Character.isDigit(j) && !Character.isLowerCase(j) && !Character.isUpperCase(j)) {
                if(j < 256) {
                    tmp.append("%");
                    if(j < 16) {
                        tmp.append("0");
                    }

                    tmp.append(Integer.toString(j, 16));
                } else {
                    tmp.append("%u");
                    tmp.append(Integer.toString(j, 16));
                }
            } else {
                tmp.append(j);
            }
        }

        return tmp.toString();
    }

    public static String unescape(String src) {
        StringBuffer tmp = new StringBuffer();
        tmp.ensureCapacity(src.length());
        int lastPos = 0;
        boolean pos = false;

        while(lastPos < src.length()) {
            int pos1 = src.indexOf("%", lastPos);
            if(pos1 == lastPos) {
                char ch;
                if(src.charAt(pos1 + 1) == 117) {
                    ch = (char)Integer.parseInt(src.substring(pos1 + 2, pos1 + 6), 16);
                    tmp.append(ch);
                    lastPos = pos1 + 6;
                } else {
                    ch = (char)Integer.parseInt(src.substring(pos1 + 1, pos1 + 3), 16);
                    tmp.append(ch);
                    lastPos = pos1 + 3;
                }
            } else if(pos1 == -1) {
                tmp.append(src.substring(lastPos));
                lastPos = src.length();
            } else {
                tmp.append(src.substring(lastPos, pos1));
                lastPos = pos1;
            }
        }

        return tmp.toString();
    }

}
