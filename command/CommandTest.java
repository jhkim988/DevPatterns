package command;

public class CommandTest {
    public static void main(String[] args) {
        Methods methods = new Methods();
        String type1 = methods.invoke("type1");
        String type2 = methods.invoke("type2");
        System.out.println(type1);
        System.out.println(type2);
    }
}
