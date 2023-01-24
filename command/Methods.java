package command;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

public class Methods {
    private final Map<String, Method> commandMap;

    public Methods() {
        commandMap = new HashMap<>();
        Arrays.asList(getClass().getDeclaredMethods()).stream()
            .filter(method -> method.getDeclaredAnnotation(Command.class) != null)
            .forEach(method -> {
                Command command = method.getDeclaredAnnotation(Command.class);
                commandMap.put(command.value(), method);
            });
    }

    @Command("type1")
    public String type1() {
        return "type1 method run";
    }

    @Command("type2")
    public String type2() {
        return "type2 method run";
    }

    public String invoke(String type) {
        if (!commandMap.containsKey(type)) {
            throw new UnsupportedOperationException();
        }
        try {
            return (String) commandMap.get(type).invoke(this);
        } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
            e.printStackTrace();
        }
        return "";
    }
}
