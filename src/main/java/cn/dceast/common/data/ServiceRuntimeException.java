package cn.dceast.common.data;

/**
 *
 * Created by xingding on 2016/10/29.
 */
public class ServiceRuntimeException extends RuntimeException {
    private String code;

    public ServiceRuntimeException(String message) {
        super(message);
    }

    public ServiceRuntimeException(String code, String message) {
        super(message);
        this.code = code;
    }

    public String toString() {
        return "ServiceRumtimeException(code=" + this.getCode() + ")";
    }

    public String getCode() {
        return this.code;
    }
}
